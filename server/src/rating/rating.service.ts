import { MovieService } from './../movie/movie.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rating, RatingDocument } from './schemas/rating.schema';
import { SetRatingDto } from './dto/set-rating.dto';

@Injectable()
export class RatingService {
	constructor(
		@InjectModel(Rating.name)
		private readonly RatingModel: Model<RatingDocument>,
		private readonly MovieService: MovieService
	) {}

	async getMovieValueByUser(movieId: Types.ObjectId, userId: Types.ObjectId) {
		return this.RatingModel.findOne({ movieId, userId })
			.select('value')
			.exec()
			.then((data) => (data ? data.value : 0));
	}

	async averageRatingByMovie(movieId: Types.ObjectId | string) {
		const ratingsMovie: RatingDocument[] =
			await this.RatingModel.aggregate()
				.match({
					movieId: new Types.ObjectId(movieId),
				})
				.exec();

		return (
			ratingsMovie.reduce((acc, item) => acc + item.value, 0) /
			ratingsMovie.length
		);
	}

	async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
		const { movieId, value } = dto;

		const newRating = await this.RatingModel.findOneAndUpdate(
			{
				userId,
				movieId,
			},
			{ movieId, userId, value },
			{
				new: true,
				upsert: true,
				setDefaultsOnInsert: true,
			}
		).exec();

		const averageRating = await this.averageRatingByMovie(movieId);

		await this.MovieService.updateRating(movieId, averageRating);

		return newRating;
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(Movie.name)
		private readonly MovieModel: Model<MovieDocument>
	) {}

	async getAll(searchTerm?: string) {
		let options = {};
		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.MovieModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('actors genres')
			.exec();
	}

	async bySlug(slug: string) {
		const doc = await this.MovieModel.findOne({ slug })
			.populate('actors genres')
			.exec();
		if (!doc) throw new NotFoundException('Movie not found!');

		return doc;
	}

	async byActor(actorId: Types.ObjectId) {
		const docs = await this.MovieModel.find({ actors: actorId }).exec();
		if (!docs) throw new NotFoundException('Movies not found!');

		return docs;
	}

	async byGenres(genreIds: Types.ObjectId[]) {
		const docs = await this.MovieModel.find({
			genres: { $in: genreIds },
		}).exec();
		if (!docs) throw new NotFoundException('Movies not found!');

		return docs;
	}

	async getMostPopular() {
		return this.MovieModel.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec();
	}

	async updateCountOpened(slug: string) {
		const updateDoc = await this.MovieModel.findOneAndUpdate(
			{ slug },
			{ $inc: { countOpened: 1 } },
			{ new: true }
		).exec();
		if (!updateDoc) throw new NotFoundException('Movie not found!');

		return updateDoc;
	}

	/* ADMIN */

	async byId(_id: string) {
		const doc = await this.MovieModel.findById(_id);
		if (!doc) throw new NotFoundException('Movie not found!');

		return doc;
	}

	async create() {
		const defaultValue: UpdateMovieDto = {
			poster: '',
			bigPoster: '',
			title: '',
			slug: '',
			videoUrl: '',
			genres: [],
			actors: [],
		};
		const movie = await this.MovieModel.create(defaultValue);

		return movie._id;
	}

	async update(_id: string, dto: UpdateMovieDto) {
		const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec();
		if (!updateDoc) throw new NotFoundException('Movie not found!');

		return updateDoc;
	}

	async delete(id: string) {
		const deleteDoc = await this.MovieModel.findByIdAndDelete(id).exec();
		if (!deleteDoc) throw new NotFoundException('Movie not found!');

		return deleteDoc;
	}
}

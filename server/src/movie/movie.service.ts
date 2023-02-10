import { TelegramService } from './../telegram/telegram.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(Movie.name)
		private readonly MovieModel: Model<MovieDocument>,
		private readonly TelegramService: TelegramService
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

	async updateRating(id: Types.ObjectId, newRating: number) {
		return this.MovieModel.findByIdAndUpdate(
			id,
			{
				rating: newRating,
			},
			{
				new: true,
			}
		).exec();
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
		if (!dto.isSendTelegram) {
			await this.sendNotification(dto);
			dto.isSendTelegram = true;
		}

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

	async sendNotification(dto: UpdateMovieDto) {
		// if (process.env.NODE_ENV !== 'development') {
		// 	await this.TelegramService.sendPhoto(dto.poster);
		// }
		await this.TelegramService.sendPhoto(
			'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg'
		);
		const message = `<b>${dto.title}</b>`;
		await this.TelegramService.sendMessage(message, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							url: 'https://www.netflix.com/ua-ru/',
							text: '🍿 Go to watch',
						},
					],
				],
			},
		});
	}
}

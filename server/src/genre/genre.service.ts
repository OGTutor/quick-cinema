import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenreDto } from './dto/createGenre.dto';
import { Genre, GenreDocument } from './schemas/genre.schema';

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(Genre.name)
		private readonly GenreModel: Model<GenreDocument>
	) {}

	async bySlug(slug: string) {
		const slugDoc = await this.GenreModel.findOne({ slug }).exec();

		if (!slugDoc) throw new NotFoundException('Slug not found!');

		return slugDoc;
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{ name: new RegExp(searchTerm, 'i') },
					{ slug: new RegExp(searchTerm, 'i') },
					{ description: new RegExp(searchTerm, 'i') },
				],
			};
		}

		return this.GenreModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
	}

	async getCollections() {
		const genres = await this.getAll();
		const collections = genres;
		return collections;
	}

	/* ADMIN */

	async byId(_id: string) {
		const genre = await this.GenreModel.findById(_id);

		if (!genre) throw new NotFoundException('Genre not found!');

		return genre;
	}

	async create() {
		const defaultValue: CreateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		};
		const genre = await this.GenreModel.create(defaultValue);
		return genre._id;
	}

	async update(_id: string, dto: CreateGenreDto) {
		const updateDoc = await this.GenreModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec();

		if (!updateDoc) throw new NotFoundException('Genre not found!');

		return updateDoc;
	}

	async delete(id: string) {
		const deleteDoc = await this.GenreModel.findByIdAndDelete(id).exec();

		if (!deleteDoc) throw new NotFoundException('Genre not found!');

		return deleteDoc;
	}
}

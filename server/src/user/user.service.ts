import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/auth/dto/updateUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly UserModel: Model<UserDocument>
	) {}

	async byId(_id: string) {
		const user = await this.UserModel.findById(_id);
		if (!user) throw new NotFoundException('User not found!');

		return user;
	}

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id);
		const isSameUser = await this.UserModel.findOne({ email: dto.email });

		if (isSameUser && String(_id) !== String(isSameUser._id))
			throw new NotFoundException('Email busy!');

		if (dto.password) {
			const salt = await genSalt(10);
			user.password = await hash(dto.password, salt);
		}

		user.email = dto.email;
		if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin;

		await user.save();

		return;
	}

	async getCount() {
		return this.UserModel.find().count().exec();
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = { $or: [{ email: new RegExp(searchTerm, 'i') }] };
		}

		return this.UserModel.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
	}

	async delete(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec();
	}
}

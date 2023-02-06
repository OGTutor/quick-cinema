import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}

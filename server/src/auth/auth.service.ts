import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import { hash, genSalt, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly UserModel: Model<UserDocument>
	) {}

	async login(dto: AuthDto) {
		return this.validateUser(dto);
	}

	async register(dto: AuthDto) {
		const oldUser = await this.UserModel.findOne({ email: dto.email });
		if (oldUser)
			throw new BadRequestException(
				'User with this email is already in the system!'
			);

		const salt = await genSalt(10);

		const newUser = new this.UserModel({
			email: dto.email,
			password: await hash(dto.password, salt),
		});

		return newUser.save();
	}

	async validateUser(dto: AuthDto) {
		const user = await this.UserModel.findOne({ email: dto.email });
		if (!user) throw new UnauthorizedException('User not found!');

		const isValidPassword = await compare(dto.password, user.password);
		if (!isValidPassword)
			throw new UnauthorizedException('Invalid password!');

		return user;
	}
}

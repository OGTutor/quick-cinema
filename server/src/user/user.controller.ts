import { UserService } from './user.service';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Put,
	UsePipes,
	ValidationPipe,
	Delete,
	Query,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { Types } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { Movie } from 'src/movie/schemas/movie.schema';

@Controller('users')
export class UserController {
	constructor(private readonly UserService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@User('_id') _id: string) {
		return this.UserService.byId(_id);
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
		return this.UserService.updateProfile(_id, dto);
	}

	@Get('profile/favorites')
	@Auth()
	async getFavorites(@User('_id') _id: Types.ObjectId) {
		return this.UserService.getFavoriteMovies(_id);
	}

	@Put('profile/favorites')
	@HttpCode(200)
	@Auth()
	async toggleFavorite(
		@Body('movieId', IdValidationPipe) movieId: Movie,
		@User() user: UserDocument
	) {
		return this.UserService.toggleFavorite(movieId, user);
	}

	@Get('count')
	@Auth('admin')
	async getCountUsers() {
		return this.UserService.getCount();
	}

	@Get()
	@Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.UserService.getAll(searchTerm);
	}

	@Get(':id')
	@Auth('admin')
	async getUser(@Param('id', IdValidationPipe) id: string) {
		return this.UserService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateUser(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateUserDto
	) {
		return this.UserService.updateProfile(id, dto);
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async deleteUser(@Param('id', IdValidationPipe) id: string) {
		return this.UserService.delete(id);
	}
}

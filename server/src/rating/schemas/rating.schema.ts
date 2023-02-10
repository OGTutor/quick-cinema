import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';
import { User } from 'src/user/schemas/user.schema';

export type RatingDocument = HydratedDocument<Rating>;

@Schema({ timestamps: true })
export class Rating {
	@Prop()
	value: number;

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	})
	userId: User;

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
	})
	movieId: Movie;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

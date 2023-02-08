import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Actor } from 'src/actor/schemas/actor.schema';
import { Genre } from 'src/genre/schemas/genre.schema';

export type MovieDocument = HydratedDocument<Movie>;

export class Parameters {
	@Prop()
	year: number;

	@Prop()
	duration: number;

	@Prop()
	country: string;
}

@Schema({ timestamps: true })
export class Movie {
	@Prop()
	poster: string;

	@Prop()
	bigPoster: string;

	@Prop()
	title: string;

	@Prop({ unique: true })
	slug: string;

	@Prop()
	parameters?: Parameters;

	@Prop({ default: 4.0 })
	rating?: number;

	@Prop()
	videoUrl: string;

	@Prop({ default: 0 })
	countOpened?: number;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
	genres: Genre[];

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }] })
	actors: Actor[];

	@Prop({ default: false })
	isSendTelegram?: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	@Prop({ unique: true })
	email: string;

	@Prop()
	password: string;

	@Prop({ default: false })
	isAdmin?: boolean;

	@Prop({
		default: [],
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
	})
	favorites?: Movie[];
}

export const UserSchema = SchemaFactory.createForClass(User);

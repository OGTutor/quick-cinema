import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: false })
    isAdmin?: boolean;

    @Prop({ default: [] })
    favorites?: [];
}

export const UserSchema = SchemaFactory.createForClass(User);

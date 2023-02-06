import { IsString, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
    @IsEmail()
    email: string;

    @MinLength(6, { message: 'Password cannot be less 6 characters!' })
    @IsString()
    password: string;
}

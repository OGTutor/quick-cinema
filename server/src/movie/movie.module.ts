import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramModule } from 'src/telegram/telegram.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
		TelegramModule,
	],
	controllers: [MovieController],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}

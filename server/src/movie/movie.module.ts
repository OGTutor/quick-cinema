import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
	],
	controllers: [MovieController],
	providers: [MovieService],
})
export class MovieModule {}

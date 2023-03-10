import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from 'src/movie/movie.module';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Genre, GenreSchema } from './schemas/genre.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
		MovieModule,
	],
	controllers: [GenreController],
	providers: [GenreService],
})
export class GenreModule {}

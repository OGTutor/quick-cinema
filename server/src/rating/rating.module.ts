import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from 'src/movie/movie.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { Rating, RatingSchema } from './schemas/rating.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Rating.name, schema: RatingSchema },
		]),
		MovieModule,
	],
	controllers: [RatingController],
	providers: [RatingService],
})
export class RatingModule {}

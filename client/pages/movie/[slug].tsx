import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import SingleMovie from '@/components/screens/single-movie/SingleMovie';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { getMovieUrl } from '@/config/url.config';

import Error404 from '../404';

export interface IMoviePage {
	movie: IMovie;
	similarMovies: IGalleryItem[];
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie similarMovies={similarMovies || []} movie={movie} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll();
		const paths = movies.map((movie) => ({
			params: { slug: movie.slug },
		}));

		return {
			paths,
			fallback: 'blocking',
		};
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(
			String(params?.slug)
		);

		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((genre) => genre._id)
		);

		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.slice(0, 5)
			.map((movie) => ({
				name: movie.title,
				posterPath: movie.poster,
				link: getMovieUrl(movie.slug),
			}));

		return {
			props: {
				similarMovies,
				movie,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default MoviePage;

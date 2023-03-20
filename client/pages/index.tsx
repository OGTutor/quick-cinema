import { GetStaticProps, NextPage } from 'next';

import Home from '@/components/screens/home/Home';
import { IHome } from '@/components/screens/home/home.types';
import { IGalleryItem } from '@/components/ui/gallery/gallery.types';
import { ISlide } from '@/components/ui/slider/slider.types';

import { ActorService } from '@/services/actor/actor.service';
import { MovieService } from '@/services/movie/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';

import { getActorUrl, getMovieUrl } from '@/config/url.config';

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll();

		const slides: ISlide[] = movies.slice(0, 3).map((movie) => ({
			_id: movie._id,
			link: getMovieUrl(movie.slug),
			bigPoster: movie.bigPoster,
			subTitle: getGenresList(movie.genres),
			title: movie.title,
		}));

		const { data: dataActors } = await ActorService.getAll();

		const actors: IGalleryItem[] = dataActors.slice(0, 5).map((actor) => ({
			name: actor.name,
			posterPath: actor.photo,
			url: getActorUrl(actor.slug),
			content: {
				title: actor.name,
				subTitle: `+${actor.countMovies} movies`,
			},
		}));

		const dataTrendingMovies = await MovieService.getMostPopular();

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 5)
			.map((movie) => ({
				name: movie.title,
				posterPath: movie.poster,
				url: getMovieUrl(movie.slug),
			}));

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
			revalidate: 60,
		};
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		};
	}
};

export default HomePage;

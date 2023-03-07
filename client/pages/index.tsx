import { GetStaticProps, NextPage } from 'next';

import Home from '@/components/screens/home/Home';
import { IHome } from '@/components/screens/home/home.interface';
import { ISlide } from '@/components/ui/slider/slider.interface';

import { MovieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';

import { getMovieUrl } from '@/config/url.config';

const HomePage: NextPage<IHome> = ({ slides }) => {
	return <Home slides={slides} />;
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

		return {
			props: {
				slides,
			} as IHome,
		};
	} catch (error) {
		return {
			props: {
				slides: [],
			},
		};
	}
};

export default HomePage;

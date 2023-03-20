import { GetStaticProps, NextPage } from 'next';

import Catalog from '@/components/screens/templates/catalog-movies/Catalog';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie/movie.service';

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Trending movies"
			description="Trending movies and series in excellent quality: legal, safe, without ads"
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPopular();

		return {
			props: {
				movies,
			},
			revalidate: 60,
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default TrendingPage;

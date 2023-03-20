import dynamic from 'next/dynamic';
import { FC } from 'react';

import PopularMovieList from './PopularMovieList/PopularMovieList';

const DynamicFavoriteMovies = dynamic(
	() => import('./FavoriteMovieList/FavoriteMovieList'),
	{ ssr: false }
);

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovieList />
			<DynamicFavoriteMovies />
		</div>
	);
};

export default MoviesContainer;

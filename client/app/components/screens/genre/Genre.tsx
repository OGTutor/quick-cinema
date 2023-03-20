import { FC } from 'react';

import Catalog from '@/components/screens/templates/catalog-movies/Catalog';

import { IGenrePage } from './genre.types';

const Genre: FC<IGenrePage> = ({ genre, movies }) => {
	return (
		<Catalog
			movies={movies}
			title={genre.name}
			description={genre.description}
		/>
	);
};

export default Genre;

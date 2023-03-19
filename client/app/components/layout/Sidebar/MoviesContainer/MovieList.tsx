import Link from 'next/link';
import { FC } from 'react';

import MovieItem from './MovieItem';
import styles from './MovieList.module.scss';
import { IMovieList } from './movie-list.interface';

const MovieList: FC<IMovieList> = ({ link, movies, title }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link href={link} legacyBehavior>
				<a className={styles.button}>
					{link === '/trending'
						? 'Popular movies'
						: 'Favorites movies'}
				</a>
			</Link>
		</div>
	);
};

export default MovieList;

import { FC } from 'react';

import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import { useAuth } from '@/hooks/useAuth';

import Meta from '@/utils/meta/Meta';

import { getMovieUrl } from '@/config/url.config';

import Error404 from '../../../../pages/404';

import FavoriteItem from './FavoriteItem';
import styles from './Favorites.module.scss';
import { useFavorites } from './useFavorites';

const Favorites: FC = () => {
	const { favoritesMovies, isLoading } = useFavorites();

	const { user } = useAuth();

	if (!user) return <Error404 />;

	return (
		<Meta title="Favorites">
			<Heading title="Favorites" />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoritesMovies?.map((movie) => (
						<FavoriteItem
							key={movie._id}
							item={{
								name: movie.title,
								posterPath: movie.bigPoster,
								url: getMovieUrl(movie.slug),
								title: movie.title,
								_id: movie._id,
							}}
						/>
					))
				)}
			</section>
		</Meta>
	);
};

export default Favorites;

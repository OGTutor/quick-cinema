import { FC } from 'react';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import Heading from '@/components/ui/heading/Heading';

import { useAuth } from '@/hooks/useAuth';

import Meta from '@/utils/meta/Meta';

import Error404 from '../../../../pages/404';

import FavoriteItem from './FavoriteItem';
import styles from './Favorites.module.scss';
import { useFavorites } from './useFavorites';

const Favorites: FC = () => {
	const { favoriteMovies, isLoading } = useFavorites();

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
					favoriteMovies?.map((movie) => (
						<FavoriteItem key={movie._id} movie={movie} />
					))
				)}
			</section>
		</Meta>
	);
};

export default Favorites;

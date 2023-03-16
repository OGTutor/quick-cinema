import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { UserService } from '@/services/user.service';

import { toastError } from '@/utils/toast-error';

import { useFavorites } from '../../favorites/useFavorites';

import styles from './FavoriteButton.module.scss';
import HeartImage from './heart-animation.png';

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false);

	const { favoriteMovies, refetch } = useFavorites();

	useEffect(() => {
		if (!favoriteMovies) return;

		const isHasMovie = favoriteMovies.some((f) => f._id === movieId);
		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie);
	}, [favoriteMovies, isSmashed, movieId]);

	const { mutateAsync } = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(movieId),
		{
			onSuccess: () => {
				setIsSmashed(!isSmashed);
				refetch();
			},
			onError: (error) => {
				toastError(error, 'Update favorite list');
			},
		}
	);

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url(${HeartImage.src})` }}
		/>
	);
};

export default FavoriteButton;

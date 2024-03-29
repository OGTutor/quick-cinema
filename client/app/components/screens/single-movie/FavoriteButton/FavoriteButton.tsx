import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { UserService } from '@/services/user/user.service';

import { toastError } from '@/utils/api/toast-error';

import { useFavorites } from '../../favorites/useFavorites';

import styles from './FavoriteButton.module.scss';

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false);

	const { favoritesMovies, refetch } = useFavorites();

	useEffect(() => {
		if (!favoritesMovies) return;

		const isHasMovie = favoritesMovies.some((f) => f._id === movieId);
		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie);
	}, [favoritesMovies, isSmashed, movieId]);

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
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	);
};

export default FavoriteButton;

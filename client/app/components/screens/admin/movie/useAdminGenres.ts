import { useQuery } from 'react-query';

import { IOption } from '@/ui/select/select.interface';

import { GenreService } from '@/services/genre/genre.service';

import { toastError } from '@/utils/api/toast-error';

export const useAdminGenres = () => {
	const queryData = useQuery('List of genres', () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({ label: genre.name, value: genre._id })
			),
		onError: (error) => {
			toastError(error, 'Genre list');
		},
	});

	return queryData;
};

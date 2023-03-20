import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { GenreService } from '@/services/genre/genre.service';

import { toastError } from '@/utils/api/toast-error';
import { getKeys } from '@/utils/object/getKeys';

import { getAdminUrl } from '@/config/url.config';

import { IGenreEditInput } from './genre-edit.interface';

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter();

	const genreId = String(query.id);

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError: (error) => {
				toastError(error, 'Get genre');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onSuccess: () => {
				toastr.success('Update genre', 'Update was successful');
				push(getAdminUrl('genres'));
			},
			onError: (error) => {
				toastError(error, 'Update genre');
			},
		}
	);

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};

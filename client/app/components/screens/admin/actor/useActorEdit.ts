import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ActorService } from '@/services/actor/actor.service';

import { toastError } from '@/utils/api/toast-error';
import { getKeys } from '@/utils/object/getKeys';

import { getAdminUrl } from '@/config/url.config';

import { IActorEditInput } from './actor-edit.interface';

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter();

	const actorId = String(query.id);

	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError: (error) => {
				toastError(error, 'Get actor');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			onSuccess: () => {
				toastr.success('Update actor', 'Update was successful');
				push(getAdminUrl('actors'));
			},
			onError: (error) => {
				toastError(error, 'Update actor');
			},
		}
	);

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};

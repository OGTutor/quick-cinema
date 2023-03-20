import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import Button from '@/components/ui/form-elements/Button';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import { UserService } from '@/services/user/user.service';

import { toastError } from '@/utils/api/toast-error';
import Meta from '@/utils/meta/Meta';

import AuthFields from '../../shared/user/AuthFields';

import styles from './Profile.module.scss';
import { IProfileInput } from './profile.interface';

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({ mode: 'onChange' });

	const { isLoading } = useQuery('profile', () => UserService.getProfile(), {
		onSuccess: ({ data }) => {
			setValue('email', data.email);
		},
		onError: (error) => {
			toastError(error, 'Get profile');
		},
	});

	const { mutateAsync } = useMutation(
		'update profile',
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onSuccess() {
				toastr.success('Update profile', 'Update was successful');
			},
			onError(error) {
				toastError(error, 'Update profile');
			},
		}
	);

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data);
	};

	return (
		<Meta title="Profile">
			<Heading title="Profile" className="mb-6 text-center" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<div className={styles.fields}>
						<AuthFields formState={formState} register={register} />
					</div>
				)}
				<Button>Update</Button>
			</form>
		</Meta>
	);
};

export default Profile;

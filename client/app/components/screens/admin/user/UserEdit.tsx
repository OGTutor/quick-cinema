import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Button from '@/components/ui/form-elements/Button';
import Heading from '@/components/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import AuthFields from '../../auth/AuthFields';

import styles from './UserEdit.module.scss';
import { useUserEdit } from './useUserEdit';
import { IUserEditInput } from './user-edit.interface';

const UserEdit: FC = () => {
	const { handleSubmit, register, formState, setValue, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		});

	const { isLoading, onSubmit } = useUserEdit(setValue);

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit user" className="text-center" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={styles.fields}>
							<AuthFields
								formState={formState}
								register={register}
							/>
							<Controller
								control={control}
								name="isAdmin"
								render={({ field }) => (
									<button
										onClick={(e) => {
											e.preventDefault();
											field.onChange(!field.value);
										}}
										className="text-link block mb-7"
									>
										{field.value
											? 'Make it as a regular user'
											: 'Make it as an admin'}
									</button>
								)}
							/>

							<Button>Update</Button>
						</div>
					</>
				)}
			</form>
		</Meta>
	);
};

export default UserEdit;

import { FC } from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';

import Field from '@/components/ui/form-elements/Field';

import { validEmail } from '@/shared/regex';

interface IAuthFields {
	register: UseFormRegister<any>;
	formState: FormState<any>;
	isPasswordRequired?: boolean;
}

const AuthFields: FC<IAuthFields> = ({
	formState: { errors },
	register,
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address',
					},
				})}
				placeholder="E-mail"
				error={Object(errors.email)}
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols',
								},
						  }
						: {}
				)}
				placeholder="Password"
				type="password"
				error={Object(errors.password)}
			/>
		</>
	);
};

export default AuthFields;

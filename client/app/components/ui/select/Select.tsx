import { FC } from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import formStyles from '../form-elements/form.module.scss';

import styles from './Select.module.scss';
import { IOption, ISelect } from './select.interface';

const animatedComponents = makeAnimated();

const Select: FC<ISelect> = ({
	field,
	options,
	placeholder,
	error,
	isLoading,
	isMulti,
}) => {
	const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		);
	};

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter(
						(option) => field.value.indexOf(option.value) >= 0
				  )
				: options.find((option) => option.value === field.value);
		} else {
			return isMulti ? [] : ('' as any);
		}
	};

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					placeholder={''}
					classNamePrefix="custom-select"
					options={options}
					value={getValue()}
					isMulti={isMulti}
					components={animatedComponents}
					isLoading={isLoading}
					onChange={onChange}
				/>
			</label>
			{error && <div className={formStyles.error}>{error.message}</div>}
		</div>
	);
};

export default Select;

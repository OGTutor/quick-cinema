import { FC } from 'react';

import MaterialIcon from '../MaterialIcon';

import styles from './SearchField.module.scss';

interface ISearchField {
	searchTerm: string;
	handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	return (
		<div className={styles.search}>
			<MaterialIcon name="MdSearch" />
			<input
				placeholder="Search"
				value={searchTerm}
				onChange={handleSearch}
			/>
		</div>
	);
};

export default SearchField;

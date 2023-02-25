import axios, { axiosClassic } from 'api/interceptors';

import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface';

import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '@/config/api.config';

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`));
	},

	async delete(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`));
	},

	async update(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data);
	},
};

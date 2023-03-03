import axios, { axiosClassic } from 'api/interceptors';

import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface';

import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/config/api.config';

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`));
	},

	async getMostPopular() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		);
		return movies;
	},

	async delete(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`));
	},

	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data);
	},

	async create() {
		return axios.post<string>(getMoviesUrl(`/`));
	},
};

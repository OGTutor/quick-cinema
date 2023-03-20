import dynamic from 'next/dynamic';
import { FC } from 'react';

import Banner from '@/components/ui/banner/Banner';
import Gallery from '@/components/ui/gallery/Gallery';
import { IGalleryItem } from '@/components/ui/gallery/gallery.types';
import SubHeading from '@/components/ui/heading/SubHeading';

import { IMovie } from '@/shared/types/movie.types';

import Meta from '@/utils/meta/Meta';

import Content from './Content/Content';
import { useUpdateCountOpened } from './useUpdateCountOpened';

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false,
});
const DynamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
});

const SingleMovie: FC<{ movie: IMovie; similarMovies: IGalleryItem[] }> = ({
	movie,
	similarMovies,
}) => {
	useUpdateCountOpened(movie.slug);

	return (
		<Meta title={movie?.title} description={`Watch ${movie?.title}`}>
			<Banner
				image={movie?.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			<DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl} />
			<div className="mt-12">
				<SubHeading
					title="Similar"
					className="text-center uppercase text-shadow"
				/>
				<Gallery items={similarMovies} />
			</div>
			<DynamicRateMovie slug={movie.slug} id={movie._id} />
		</Meta>
	);
};

export default SingleMovie;

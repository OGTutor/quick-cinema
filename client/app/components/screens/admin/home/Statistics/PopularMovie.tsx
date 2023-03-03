import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useQuery } from 'react-query';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import SubHeading from '@/components/ui/heading/SubHeading';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { getMovieUrl } from '@/config/url.config';

import styles from '../Admin.module.scss';

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery(
		'Most popular movie in admin',
		() => MovieService.getMostPopular(),
		{ select: (data): IMovie => data[0] }
	);

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<h3>Viewed {movie.countOpened} times</h3>
						<Link href={getMovieUrl(movie.slug)} legacyBehavior>
							<a>
								<Image
									width={285}
									height={176}
									src={movie.bigPoster}
									alt={movie.title}
									className={styles.image}
									unoptimized
								/>
							</a>
						</Link>
					</>
				)
			)}
		</div>
	);
};

export default PopularMovie;

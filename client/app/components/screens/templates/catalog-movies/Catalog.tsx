import { FC } from 'react';

import GalleryItem from '@/components/ui/gallery/GalleryItem';
import Description from '@/components/ui/heading/Description';
import Heading from '@/components/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import { getMovieUrl } from '@/config/url.config';

import styles from './Catalog.module.scss';
import { ICatalog } from './catalog.types';

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description
					text={description}
					className={styles.description}
				/>
			)}
			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							name: movie.title,
							url: getMovieUrl(movie.slug),
							posterPath: movie.bigPoster,
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</Meta>
	);
};

export default Catalog;

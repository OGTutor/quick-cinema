import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Actor from '@/components/screens/actor/Actor';
import { IActorPage } from '@/components/screens/actor/actor.types';

import { ActorService } from '@/services/actor/actor.service';
import { MovieService } from '@/services/movie/movie.service';

import Error404 from '../404';

const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
	return actor ? <Actor actor={actor} movies={movies} /> : <Error404 />;
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll();
		const paths = actors.map((actor) => ({
			params: { slug: actor.slug },
		}));

		return {
			paths,
			fallback: 'blocking',
		};
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.getBySlug(
			String(params?.slug)
		);

		const { data: movies } = await MovieService.getByActor(actor._id);

		return {
			props: {
				movies,
				actor,
			},
			revalidate: 60,
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default ActorPage;

import { FC } from 'react';

import Heading from '@/components/ui/heading/Heading';
import Slider from '@/components/ui/slider/Slider';

import Meta from '@/utils/meta/Meta';

import { IHome } from './home.interface';

const Home: FC<IHome> = ({ slides }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch QuickCinema app movies and TV shows online or stream right to your browser"
		>
			<Heading
				title="Watch movies online"
				className="text-gray-300 mb-8 text-2xl text-center uppercase text-shadow"
			/>
			{slides.length && <Slider slides={slides} />}
		</Meta>
	);
};

export default Home;

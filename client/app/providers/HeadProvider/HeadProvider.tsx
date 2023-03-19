import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { FC, PropsWithChildren } from 'react';

import { accentColor } from '@/config/constants';

import Favicons from './Favicons';

const HeadProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<NextNProgress
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5"
				/>

				<Favicons />

				<meta name="theme-color" content={'#181B1E'} />
				<meta
					name="msapplication-navbutton-color"
					content={'#181B1E'}
				/>
				<meta
					name="app-mobile-web-app-status-bar-style"
					content={'#181B1E'}
				/>
				<link rel="manifest" href="/manifest.json" />
			</Head>
			{children}
		</>
	);
};

export default HeadProvider;

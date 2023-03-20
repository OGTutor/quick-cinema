import Head from 'next/head';
import { FC } from 'react';

import { titleMerge } from '@/config/seo.config';

const MetaNoIndex: FC<{ title?: string }> = ({ title = 'Error' }) => {
	return (
		<Head>
			<title>{titleMerge(title)}</title>
			<meta name="robots" content="noindex, nofollow" />
		</Head>
	);
};

export default MetaNoIndex;

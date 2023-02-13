import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import logoImage from '@/assets/images/logo.svg';

const Logo: FC = () => {
	return (
		<Link href="/" legacyBehavior>
			<a className="px-layout mb-10 block w-full">
				<Image
					src={logoImage}
					width={247}
					height={34}
					alt="Quick Cinema"
					draggable={false}
				/>
			</a>
		</Link>
	);
};

export default Logo;

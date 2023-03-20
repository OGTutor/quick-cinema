import Image from 'next/image';
import { FC } from 'react';

import { ICollection } from './collections.types';

const CollectionImage: FC<{ collection: ICollection }> = ({
	collection: { image, title },
}) => {
	return <Image alt={title} src={image} fill draggable={false} />;
};

export default CollectionImage;

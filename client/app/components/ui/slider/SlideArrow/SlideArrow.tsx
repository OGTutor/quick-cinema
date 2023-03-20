import cn from 'classnames';
import { FC } from 'react';

import MaterialIcon from '@/components/ui/icons/MaterialIcon';

import styles from './SlideArrow.module.scss';

interface ISlideArrow {
	variant: 'left' | 'right';
	clickHandler: () => void;
}

const SlideArrow: FC<ISlideArrow> = ({ clickHandler, variant }) => {
	const isLeft = variant === 'left';

	return (
		<button
			onClick={clickHandler}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
			aria-label={isLeft ? 'previous slide' : 'next slide'}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	);
};

export default SlideArrow;

import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import SlideArrow from './SlideArrow/SlideArrow';
import SlideItem from './SlideItem';
import styles from './Slider.module.scss';
import { ISlide } from './slider.types';
import { useSlider } from './useSlider';

interface ISlider {
	slides: ISlide[];
	buttonTitle?: string;
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	);

	return (
		<div className={styles.slider}>
			<CSSTransition
				in={slideIn}
				classNames="slide-animation"
				timeout={300}
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>
			{isPrev && (
				<SlideArrow
					variant="left"
					clickHandler={() => handleClick('prev')}
				/>
			)}
			{isNext && (
				<SlideArrow
					variant="right"
					clickHandler={() => handleClick('next')}
				/>
			)}
		</div>
	);
};

export default Slider;

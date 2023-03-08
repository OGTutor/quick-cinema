import { FC } from 'react';

interface ISubHeading {
	title: string;
	className?: string;
}

const SubHeading: FC<ISubHeading> = ({ title, className }) => {
	return (
		<h2 className={`text-white text-xl mb-5 font-semibold ${className}`}>
			{title}
		</h2>
	);
};

export default SubHeading;

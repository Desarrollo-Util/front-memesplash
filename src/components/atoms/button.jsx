import { clsx } from 'clsx';

const KINDS = {
	primary: 'text-white bg-blue-700',
	secondary: 'text-white bg-purple-700'
};

const SIZES = {
	small: 'h-10 text-xs px-4',
	regular: 'h-12 px-6',
	large: 'h-14 text-lg px-8'
};

const Button = ({ kind = 'primary', size = 'regular', ...props }) => (
	<button
		className={clsx(
			'flex items-center justify-center rounded-sm',
			SIZES[size],
			KINDS[kind]
		)}
		{...props}
	/>
);

export default Button;

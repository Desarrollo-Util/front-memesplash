import { clsx } from 'clsx';

const KINDS = {
	primary: 'btn-primary',
	secondary: 'btn-secondary'
};

const SIZES = {
	small: 'btn-sm',
	regular: 'btn-regular',
	large: 'btn-large'
};

const Button = ({ kind = 'primary', size = 'regular', ...props }) => (
	<button className={clsx('btn', SIZES[size], KINDS[kind])} {...props} />
);

export default Button;

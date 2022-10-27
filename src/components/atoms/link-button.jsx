import { clsx } from 'clsx';
import Link from 'next/link';

const KINDS = {
	primary: 'btn-primary',
	secondary: 'btn-secondary'
};

const SIZES = {
	small: 'btn-small',
	regular: 'btn-regular',
	large: 'btn-large'
};

const LinkButton = ({ href, kind = 'primary', size = 'regular', ...props }) => (
	<Link
		href={href}
		className={clsx('btn', SIZES[size], KINDS[kind])}
		{...props}
	/>
);

export default LinkButton;

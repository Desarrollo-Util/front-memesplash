import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import LinkButton from '../atoms/link-button';
import HeaderUserDisplay from './header-user-display';

const Header = () => {
	const { auth } = useContext(AuthContext);

	return (
		<header className='flex-sb-c h-16 px-4'>
			<div className='flex-s-c gap-2'>
				<span className='flex-c-c h-10 w-10 bg-indigo-500 text-white font-bold rounded'>
					MS
				</span>
				<span className='text-lg font-bold'>MemeSplash</span>
			</div>
			{auth ? (
				<HeaderUserDisplay user={auth.user} />
			) : (
				<LinkButton href='/login' size='small'>
					Login
				</LinkButton>
			)}
		</header>
	);
};

export default Header;

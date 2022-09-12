import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { nextLogoutEndpoint } from '../lib/api/next-auth.api';
import { withAuthGSSP } from '../lib/hof/with-auth-gssp';

const AuthPage = () => {
	const { auth, logout } = useContext(AuthContext);
	const { push } = useRouter();

	return (
		<div>
			<p>Logueado como {auth.user.name}</p>
			<button
				onClick={async () => {
					const response = await nextLogoutEndpoint();

					if (!response.error) {
						logout();
						push('/login');
					}
				}}
			>
				Logout
			</button>
		</div>
	);
};

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = withAuthGSSP((_, authState) => {
	return {
		props: { authState }
	};
});

export default AuthPage;

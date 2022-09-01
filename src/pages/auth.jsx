import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';

const AuthPage = () => {
	const { auth } = useContext(AuthContext);

	if (!auth) return <p>Cargando...</p>;

	return <h1>Página con Auth {auth}</h1>;
};

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = ({ req }) => {
	const { cookies } = req;
	const authToken = cookies[process.env.COOKIE_AUTH_KEY];

	if (!authToken) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}

	return {
		props: { authToken }
	};
};

export default AuthPage;

import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { withAuth } from '../lib/hof/with-auth';

const AuthPage = () => {
	const { auth } = useContext(AuthContext);

	if (!auth) return <p>Cargando...</p>;

	return <h1>Página con Auth {auth}</h1>;
};

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = withAuth((_, authToken) => {
	return {
		props: { authToken }
	};
});

export default AuthPage;

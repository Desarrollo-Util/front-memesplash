import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';

const AuthPage = () => {
	const { auth } = useContext(AuthContext);

	if (!auth) return <p>Cargando...</p>;

	return <h1>Página con Auth {auth}</h1>;
};

export default AuthPage;

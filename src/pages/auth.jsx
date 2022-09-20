import { useLogout, useProfile } from '../hooks/api/users';
import { authGSSP } from '../lib/gssp/auth-gssp';

const AuthPage = () => {
	const { data } = useProfile();
	const { mutateAsync: logout } = useLogout();

	return (
		<div>
			<p>Logueado como {data?.name}</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export const getServerSideProps = authGSSP;

export default AuthPage;

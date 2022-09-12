import Head from 'next/head';
import Header from '../components/navigation/header';
import { AuthContext } from '../contexts/auth-context';
import { useAuth } from '../hooks/use-auth';
import '../styles/index.css';

const App = ({ Component, pageProps }) => {
	const { authState, ...componentProps } = pageProps;

	const { auth, login, logout, updateProfile } = useAuth(authState);

	return (
		<AuthContext.Provider value={{ auth, login, logout, updateProfile }}>
			<Head>
				<title>MemeSplash</title>
			</Head>
			<Header />
			<Component {...componentProps} />
			<footer></footer>
		</AuthContext.Provider>
	);
};

export default App;

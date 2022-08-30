import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import '../styles/index.css';

const App = ({ Component, pageProps }) => {
	const [auth, setAuth] = useState();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) setAuth(token);
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			<header></header>
			<Component {...pageProps} />
			<footer></footer>
		</AuthContext.Provider>
	);
};

export default App;

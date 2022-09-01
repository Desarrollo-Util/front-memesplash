import { useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import '../styles/index.css';

const App = ({ Component, pageProps }) => {
	const [auth, setAuth] = useState(pageProps?.authToken);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			<header></header>
			<Component {...pageProps} />
			<footer></footer>
		</AuthContext.Provider>
	);
};

export default App;

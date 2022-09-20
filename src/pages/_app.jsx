import Head from 'next/head';
import { Hydrate, QueryClientProvider } from 'react-query';
import Header from '../components/navigation/header';
import { AuthContext } from '../contexts/auth-context';
import { useAuth } from '../hooks/use-auth';
import { useQueryClient } from '../hooks/use-query-client';
import '../styles/index.css';

const App = ({ Component, pageProps }) => {
	const { authToken, dehydratedState, ...componentProps } = pageProps;

	const { authTokenRef, updateAuthToken } = useAuth(authToken);
	const queryClient = useQueryClient(authToken, authTokenRef);

	return (
		<QueryClientProvider client={queryClient.current}>
			<AuthContext.Provider
				value={{
					authToken: authTokenRef.current,
					updateAuthToken
				}}
			>
				<Hydrate state={dehydratedState}>
					<Head>
						<title>MemeSplash</title>
					</Head>
					<Header />
					<Component {...componentProps} />
					<footer></footer>
				</Hydrate>
			</AuthContext.Provider>
		</QueryClientProvider>
	);
};

export default App;

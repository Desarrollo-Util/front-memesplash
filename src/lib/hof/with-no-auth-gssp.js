import { dehydrate, QueryClient } from 'react-query';
import { getAuthTokenFromCookie } from '../utils/auth-cookie.utils';

const REDIRECT = {
	redirect: {
		destination: '/auth',
		permanent: false
	}
};

/**
 * High order function for pages where REDIRECTS if the user IS AUTHENTICATED
 *  - authToken -> Redirect
 *  - !authToken-> Props
 *  - IsSSR is irrelevant in this case
 *
 * @param {Function} nextFn Next function to execute
 */
export const withNoAuthGSSP = nextFn => async context => {
	const { req } = context;

	const authToken = getAuthTokenFromCookie(req);

	if (authToken) return REDIRECT;

	const queryClient = new QueryClient();

	await nextFn(context, queryClient);

	return {
		props: { authToken: null, dehydratedState: dehydrate(queryClient) }
	};
};

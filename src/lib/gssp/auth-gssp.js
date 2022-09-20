import { dehydrate, QueryClient } from 'react-query';
import { profileEndpoint } from '../api/auth.api';
import {
	getAuthTokenFromCookie,
	removeAuthCookie
} from '../utils/auth-cookie.utils';
import { isSSR } from '../utils/is-ssr.utils';

const REDIRECT = {
	redirect: {
		destination: '/login',
		permanent: false
	}
};

/**
 * GSSP function for pages where REDIRECTS if the user ISN'T AUTHENTICATED
 *  - !authToken -> Redirect
 *  - authToken && !isSSR  -> Props (auth token)
 *  - authToken && isSSR -> Get profile and props
 *    - Error on get profile (so rare) -> Remove cookie and redirect
 */
export const authGSSP = async context => {
	const { req, res } = context;

	const authToken = getAuthTokenFromCookie(req);
	if (!authToken) return REDIRECT;

	if (!isSSR(context)) return { props: { authToken } };

	try {
		const queryClient = new QueryClient();

		await queryClient.fetchQuery(['profile', authToken], () =>
			profileEndpoint(authToken)
		);

		return {
			props: {
				authToken,
				dehydratedState: dehydrate(queryClient)
			}
		};
	} catch (error) {
		removeAuthCookie(res);
		return REDIRECT;
	}
};

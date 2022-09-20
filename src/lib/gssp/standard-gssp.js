import { dehydrate, QueryClient } from 'react-query';
import { profileEndpoint } from '../api/auth.api';
import {
	getAuthTokenFromCookie,
	removeAuthCookie
} from '../utils/auth-cookie.utils';
import { isSSR } from '../utils/is-ssr.utils';

/**
 * GSSP function for pages where AUTHENTICATION IS OPTIONAL
 *  - !authToken && !isSSR-> Props
 *  - !authToken && isSSR -> Props
 *  - authToken && !isSSR  -> Props
 *  - authToken && isSSR -> Get profile and props
 *    - Error on get profile (so rare) -> Remove cookie and props
 *
 */
export const standardGSSP = async context => {
	const { req, res } = context;

	const authToken = getAuthTokenFromCookie(req);

	if (!authToken || !isSSR(context)) return { props: { authToken } };

	try {
		const queryClient = new QueryClient();

		await queryClient.fetchQuery(['profile', authToken], () =>
			profileEndpoint(authToken)
		);

		return {
			props: { authToken, dehydratedState: dehydrate(queryClient) }
		};
	} catch (error) {
		removeAuthCookie(res);

		return {
			props: { authToken: null }
		};
	}
};

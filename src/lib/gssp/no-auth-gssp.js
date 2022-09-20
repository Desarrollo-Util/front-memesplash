import { getAuthTokenFromCookie } from '../utils/auth-cookie.utils';

const REDIRECT = {
	redirect: {
		destination: '/auth',
		permanent: false
	}
};

/**
 * GSSP function for pages where REDIRECTS if the user IS AUTHENTICATED
 *  - authToken -> Redirect
 *  - !authToken-> Props
 *  - IsSSR is irrelevant in this case
 */
export const noAuthGSSP = async context => {
	const { req } = context;

	const authToken = getAuthTokenFromCookie(req);

	if (authToken) return REDIRECT;

	return { props: { authToken: null } };
};

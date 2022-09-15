import { getAuthTokenFromCookie } from '../utils/auth-cookie.utils';

const REDIRECT = {
	redirect: {
		destination: '/auth',
		permanent: false
	}
};

export const withNoAuthGSSP = nextFn => context => {
	const { req } = context;

	const authToken = getAuthTokenFromCookie(req);

	if (authToken) return REDIRECT;

	return nextFn ? nextFn(context) : { props: {} };
};

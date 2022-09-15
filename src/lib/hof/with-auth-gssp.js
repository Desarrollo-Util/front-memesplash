import { profileEndpoint } from '../api/auth.api';
import { removeAuthCookie } from '../utils/auth-cookie.utils';

const REDIRECT = {
	redirect: {
		destination: '/login',
		permanent: false
	}
};

export const withAuthGSSP = nextFn => async context => {
	const { req, res } = context;

	const token = req.cookies[process.env.COOKIE_AUTH_KEY];

	if (!token) return REDIRECT;

	const profileResponse = await profileEndpoint(token);

	if (profileResponse.error) {
		removeAuthCookie(res);
		return REDIRECT;
	}

	const authState = {
		user: profileResponse.data,
		token
	};

	return nextFn
		? nextFn(context, authState)
		: {
				props: {
					authState
				}
		  };
};

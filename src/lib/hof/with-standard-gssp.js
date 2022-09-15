import { profileEndpoint } from '../api/auth.api';
import { removeAuthCookie } from '../utils/auth-cookie.utils';

export const withStandardGSSP = nextFn => async context => {
	const { req, res } = context;

	const token = req.cookies[process.env.COOKIE_AUTH_KEY];

	if (!token) return nextFn ? nextFn(context) : { props: {} };

	const profileResponse = await profileEndpoint(token);

	if (profileResponse.error) {
		removeAuthCookie(res);
		return nextFn ? nextFn(context) : { props: {} };
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

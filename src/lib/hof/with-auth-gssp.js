import { profileEndpoint } from '../api/auth.api';
import {
	getAuthTokenFromCookie,
	removeAuthCookie
} from '../utils/auth-cookie.utils';

const REDIRECT = {
	redirect: {
		destination: '/login',
		permanent: false
	}
};

export const withAuthGSSP = nextFn => async context => {
	const { req, res, resolvedUrl } = context;

	const token = getAuthTokenFromCookie(req);
	if (!token) return REDIRECT;

	const isSSR = req.url === resolvedUrl;

	if (isSSR) {
		const profileResponse = await profileEndpoint(token);

		if (profileResponse.error) {
			removeAuthCookie(res);
			return REDIRECT;
		}

		const authState = {
			user: profileResponse.data,
			token
		};

		return nextFn ? nextFn(context, authState) : { props: { authState } };
	}

	return nextFn ? nextFn(context) : { props: {} };
};

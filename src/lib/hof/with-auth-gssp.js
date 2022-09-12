import { profileEndpoint } from '../api/auth.api';
import { removeAuthCookie } from '../utils/auth-cookie.utils';

const REDIRECT = {
	redirect: {
		destination: '/login',
		permanent: false
	}
};

export const withAuthGSSP =
	nextFn =>
	async ({ req, res, ...args }) => {
		const token = req.cookies[process.env.COOKIE_AUTH_KEY];

		if (!token) return REDIRECT;

		const profileResponse = await profileEndpoint(token);

		if (profileResponse.error) {
			removeAuthCookie(res);
			return REDIRECT;
		}

		return nextFn(
			{ req, res, ...args },
			{
				user: profileResponse.data,
				token
			}
		);
	};

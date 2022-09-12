import { profileEndpoint } from '../api/auth.api';
import { removeAuthCookie } from '../utils/auth-cookie.utils';

export const withStandardGSSP =
	nextFn =>
	async ({ req, res, ...args }) => {
		const token = req.cookies[process.env.COOKIE_AUTH_KEY];

		if (!token) return nextFn({ req, res, ...args });

		const profileResponse = await profileEndpoint(token);

		if (profileResponse.error) {
			removeAuthCookie(res);
			return nextFn({ req, res, ...args });
		}

		return nextFn(
			{ req, res, ...args },
			{
				user: profileResponse.data,
				token
			}
		);
	};

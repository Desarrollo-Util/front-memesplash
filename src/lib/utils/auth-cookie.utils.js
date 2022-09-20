import { serialize as serializeCookie } from 'cookie';
import { decode } from 'jsonwebtoken';

export const getAuthTokenFromCookie = req =>
	req.cookies[process.env.COOKIE_AUTH_KEY] || null;

export const setAuthCookie = (res, token) => {
	const tokenPayload = decode(token);

	const authCookie = serializeCookie(process.env.COOKIE_AUTH_KEY, token, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		expires: new Date(tokenPayload.exp * 1000)
	});

	res.setHeader('Set-Cookie', authCookie);
};

export const removeAuthCookie = res => {
	const emptyAuthCookie = serializeCookie(process.env.COOKIE_AUTH_KEY, '', {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 0
	});

	res.setHeader('Set-Cookie', emptyAuthCookie);
};

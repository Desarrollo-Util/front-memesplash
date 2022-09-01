import { serialize as serializeCookie } from 'cookie';
import { decode } from 'jsonwebtoken';

/** @type {import('next').NextApiHandler} */
const loginController = async (req, res) => {
	const { method, body } = req;

	// Esto es una broma
	// Emosido engañado
	if (method !== 'POST')
		return res.status(418).send({ errorMessage: 'Fuck you cheater' });

	const { email, password, ...rest } = body;

	if (!email || !password)
		return res
			.status(400)
			.send({ errorMessage: 'Faltan campos obligatorios' });

	if (Object.keys(rest).length !== 0)
		return res
			.status(400)
			.send({ errorMessage: 'Existen campos sobrantes' });

	const loginBackendResponse = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URI}/login`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}
	);

	const backendPayload = await loginBackendResponse.json();

	if (!loginBackendResponse.ok)
		return res.status(loginBackendResponse.status).send(backendPayload);

	const jwtPayload = decode(backendPayload.token);

	res.setHeader(
		'Set-Cookie',
		serializeCookie(process.env.COOKIE_AUTH_KEY, backendPayload.token, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			expires: new Date(jwtPayload.exp * 1000)
		})
	);

	return res.send(backendPayload);
};

export default loginController;

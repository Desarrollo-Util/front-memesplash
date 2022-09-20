import { AxiosError } from 'axios';
import { loginEndpoint, profileEndpoint } from '../../lib/api/auth.api';
import { setAuthCookie } from '../../lib/utils/auth-cookie.utils';

/** @type {import('next').NextApiHandler} */
const loginController = async (req, res) => {
	const { method, body } = req;

	// #region Validaciones
	if (method !== 'POST') return res.status(405).send();

	const { email, password, ...rest } = body;

	if (!email || !password)
		return res
			.status(400)
			.send({ errorMessage: 'Faltan campos obligatorios' });

	if (Object.keys(rest).length !== 0)
		return res
			.status(400)
			.send({ errorMessage: 'Existen campos sobrantes' });

	// #endregion

	try {
		// Login
		const loginResponse = await loginEndpoint(email, password);
		const token = loginResponse.token;

		// Profile
		const profileResponse = await profileEndpoint(token);
		const profile = profileResponse;

		// Set auth cookie
		setAuthCookie(res, token);

		return res.json({
			token,
			profile
		});
	} catch (err) {
		if (err instanceof AxiosError)
			return res.status(err.response?.status).json({
				errorMessage: err.response?.data.errorMessage
			});
		console.log(err);
		return res.status(500).end();
	}
};

export default loginController;

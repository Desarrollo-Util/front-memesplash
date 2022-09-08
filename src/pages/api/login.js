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

	// Login

	const loginResponse = await loginEndpoint(email, password);

	if (loginResponse.error) {
		return res.status(loginResponse.status).send(loginResponse.error);
	}

	const token = loginResponse.data.token;

	// Profile

	const profileResponse = await profileEndpoint(token);

	if (profileResponse.error) {
		return res.status(profileResponse.status).send(profileResponse.error);
	}

	const profile = profileResponse.data;

	// Set auth cookie

	setAuthCookie(res, token);

	return res.json({
		token,
		profile
	});
};

export default loginController;

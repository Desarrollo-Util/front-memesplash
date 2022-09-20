import { getAuthTokenFromCookie } from '../../lib/utils/auth-cookie.utils';

/** @type {import('next').NextApiHandler} */
const refreshController = async (req, res) => {
	const { method } = req;
	if (method !== 'POST') return res.status(405).send();

	const authToken = getAuthTokenFromCookie(req);

	if (!authToken)
		return res.status(401).send({ errorMessage: 'No autorizado' });

	return res.json({
		token: authToken
	});
};

export default refreshController;

import { removeAuthCookie } from '../../lib/utils/auth-cookie.utils';

/** @type {import('next').NextApiHandler} */
const logoutController = async (req, res) => {
	if (req.method !== 'POST') return res.status(405).send();

	removeAuthCookie(res);

	res.end();
};

export default logoutController;

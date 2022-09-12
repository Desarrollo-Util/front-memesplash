const REDIRECT = {
	redirect: {
		destination: '/auth',
		permanent: false
	}
};

export const withNoAuth =
	nextFn =>
	({ req, ...args }) => {
		const authToken = req.cookies[process.env.COOKIE_AUTH_KEY];

		if (authToken) return REDIRECT;

		return nextFn({ req, ...args });
	};

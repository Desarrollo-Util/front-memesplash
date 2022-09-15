const REDIRECT = {
	redirect: {
		destination: '/auth',
		permanent: false
	}
};

export const withNoAuthGSSP = nextFn => context => {
	const { req } = context;

	const authToken = req.cookies[process.env.COOKIE_AUTH_KEY];

	if (authToken) return REDIRECT;

	return nextFn ? nextFn(context) : { props: {} };
};

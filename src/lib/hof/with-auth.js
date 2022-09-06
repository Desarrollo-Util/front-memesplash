export const withAuth = nextFn => {
	return ({ req, ...args }) => {
		const { cookies } = req;
		const authToken = cookies[process.env.COOKIE_AUTH_KEY];

		if (!authToken) {
			return {
				redirect: {
					destination: '/login',
					permanent: false
				}
			};
		}

		return nextFn({ req, ...args }, authToken);
	};
};

const endpoints = {
	login: `${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/login`,
	logout: `${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/logout`
};

export const nextLoginEndpoint = async (email, password) => {
	const response = await fetch(endpoints.login, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) return { error: true };

	const data = await response.json();

	return { data };
};

export const nextLogoutEndpoint = async () => {
	const response = await fetch(endpoints.logout, {
		method: 'POST'
	});

	if (!response.ok) return { error: true };

	return { data: true };
};

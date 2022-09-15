const endpoints = {
	login: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/login`,
	profile: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/profile`
};

export const loginEndpoint = async (email, password) => {
	const response = await fetch(endpoints.login, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) {
		return { error: 'Error', status: response.status };
	}

	const data = await response.json();

	return { data: { token: data.token }, status: 200 };
};

export const profileEndpoint = async token => {
	const response = await fetch(endpoints.profile, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		return { error: 'Error', status: response.status };
	}

	const data = await response.json();

	return { data, status: 200 };
};

import axios from 'axios';

const endpoints = {
	login: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/login`,
	profile: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/profile`
};

export const loginEndpoint = async (email, password) => {
	const { data } = await axios.post(endpoints.login, { email, password });

	return data;
};

export const profileEndpoint = async token => {
	const { data } = await axios.get(endpoints.profile, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return data;
};

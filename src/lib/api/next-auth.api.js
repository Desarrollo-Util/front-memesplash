import axios from 'axios';

const endpoints = {
	login: `${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/login`,
	logout: `${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/logout`,
	refresh: `${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/refresh`
};

export const nextLoginEndpoint = async (email, password) => {
	const { data } = await axios.post(endpoints.login, { email, password });

	return data;
};

export const nextLogoutEndpoint = async () => {
	const { data } = await axios.post(endpoints.logout);

	return data;
};

export const nextRefreshEndpoint = async () => {
	const { data } = await axios.post(endpoints.refresh);

	return data;
};

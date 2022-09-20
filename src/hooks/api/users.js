import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AuthContext } from '../../contexts/auth-context';
import { profileEndpoint } from '../../lib/api/auth.api';
import {
	nextLoginEndpoint,
	nextLogoutEndpoint,
	nextRefreshEndpoint
} from '../../lib/api/next-auth.api';

export const useLogin = () => {
	const { updateAuthToken } = useContext(AuthContext);

	return useMutation(async ({ email, password }) => {
		const loginResponse = await nextLoginEndpoint(email, password);
		if (loginResponse.token) updateAuthToken(loginResponse.token);
		return loginResponse;
	});
};

export const useProfile = () => {
	const { authToken } = useContext(AuthContext);

	return useQuery(['profile', authToken], () => profileEndpoint(authToken), {
		enabled: !!authToken
	});
};

export const useLogout = () => {
	const { updateAuthToken } = useContext(AuthContext);
	const { push } = useRouter();

	return useMutation(async () => {
		await nextLogoutEndpoint();
		updateAuthToken();
		push('/login');
	});
};

export const useRefresh = () => {
	const { updateAuthToken } = useContext(AuthContext);

	return useMutation(async () => {
		const refreshResponse = await nextRefreshEndpoint();
		if (refreshResponse.token) updateAuthToken(refreshResponse.token);

		return refreshResponse;
	});
};

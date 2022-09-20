import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { useRefresh } from './api/users';

export const useRefreshAuth = () => {
	const { authToken } = useContext(AuthContext);
	const { mutateAsync: refresh } = useRefresh();

	useEffect(() => {
		try {
			authToken === undefined && refresh();
		} catch (err) {}
	}, [authToken, refresh]);
};

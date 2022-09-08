import { useState } from 'react';

export const useAuth = initialState => {
	const [auth, setAuth] = useState(initialState);

	const login = (token, user) =>
		setAuth({
			token,
			user
		});

	const logout = () => setAuth();

	const updateProfile = user => setAuth({ token: auth.token, user });

	return { auth, login, logout, updateProfile };
};

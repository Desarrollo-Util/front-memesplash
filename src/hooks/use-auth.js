import { useRef, useState } from 'react';

export const useAuth = authToken => {
	const authTokenRef = useRef(authToken);
	const [, setDummy] = useState(true);

	const updateAuthToken = newToken => {
		if (newToken === authTokenRef.current) return;

		authTokenRef.current = newToken;
		setDummy(prev => !prev);
	};

	if (authToken !== undefined && authToken !== authTokenRef.current)
		authTokenRef.current = authToken;

	return { authTokenRef, updateAuthToken };
};

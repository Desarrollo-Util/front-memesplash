import { useRef } from 'react';
import { QueryClient } from 'react-query';
import { reactQueryConfig } from '../lib/api/react-query.config';

export const useQueryClient = (authToken, authTokenRef) => {
	const queryClient = useRef(new QueryClient(reactQueryConfig));

	if (authToken !== undefined && authToken !== authTokenRef.current)
		queryClient.current.clear();

	return queryClient;
};

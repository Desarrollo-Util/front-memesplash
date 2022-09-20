import { useRefreshAuth } from '../hooks/use-refresh-auth';

const TestStatic = () => {
	useRefreshAuth();

	return (
		<div>
			<h1>Esta página es estática</h1>
		</div>
	);
};

export default TestStatic;

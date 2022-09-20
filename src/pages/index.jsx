import { standardGSSP } from '../lib/gssp/standard-gssp';

const HomePage = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

export const getServerSideProps = standardGSSP;

export default HomePage;

import { withStandardGSSP } from '../lib/hof/with-standard-gssp';

const HomePage = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = withStandardGSSP();

export default HomePage;

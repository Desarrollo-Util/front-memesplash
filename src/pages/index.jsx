import { withStandardGSSP } from '../lib/hof/with-standard-gssp';

const HomePage = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = withStandardGSSP((_, authState) => {
	return {
		props: {
			authState: authState || null
		}
	};
});

export default HomePage;

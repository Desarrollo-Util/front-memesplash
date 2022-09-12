import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/atoms/button';
import InputPassword from '../components/atoms/inputs/input-password';
import InputText from '../components/atoms/inputs/input-text';
import { AuthContext } from '../contexts/auth-context';
import { nextLoginEndpoint } from '../lib/api/next-auth.api';
import { withNoAuthGSSP } from '../lib/hof/with-no-auth-gssp';

const FORM_NAMES = {
	EMAIL: 'email',
	PASSWORD: 'password'
};

const LoginPage = () => {
	const { login } = useContext(AuthContext);
	const { push: routerPush } = useRouter();
	const { handleSubmit, register } = useForm();

	return (
		<div className='p-6 container max-w-lg mx-auto'>
			<form
				className='flexcol-s-st gap-4'
				onSubmit={handleSubmit(formValues =>
					onSubmit(formValues, login, routerPush)
				)}
			>
				<InputText label='Email' {...register(FORM_NAMES.EMAIL)} />
				<InputPassword
					label='Contraseña'
					{...register(FORM_NAMES.PASSWORD)}
				/>
				<Button type='submit'>Iniciar sesión</Button>
			</form>
		</div>
	);
};

const onSubmit = async (formValues, login, routerPush) => {
	const { email, password } = formValues;

	const response = await nextLoginEndpoint(email, password);

	if (response.error) return;

	const { token, profile } = response.data;

	login(token, profile);

	routerPush('/auth');
};

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = withNoAuthGSSP(() => {
	return { props: {} };
});

export default LoginPage;

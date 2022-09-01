import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/atoms/button';
import InputPassword from '../components/atoms/inputs/input-password';
import InputText from '../components/atoms/inputs/input-text';
import { AuthContext } from '../contexts/auth-context';

const FORM_NAMES = {
	EMAIL: 'email',
	PASSWORD: 'password'
};

const LoginPage = () => {
	const { push } = useRouter();
	const { auth, setAuth } = useContext(AuthContext);
	const { handleSubmit, register } = useForm();

	useEffect(() => {
		if (!auth) return;
		push('/auth');
	}, [auth, push]);

	return (
		<div className='p-6 container max-w-lg mx-auto'>
			<form
				className='flexcol-s-st gap-4'
				onSubmit={handleSubmit(data => onSubmit(data, setAuth))}
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

const onSubmit = async (data, setAuth) => {
	const { email, password } = data;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/login`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}
	);

	const responseData = await response.json();

	if (response.ok) setAuth(responseData.token);
	else console.error(responseData.errorMessage);
};

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = ({ req }) => {
	const { cookies } = req;
	const authToken = cookies[process.env.COOKIE_AUTH_KEY];

	if (authToken) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
};

export default LoginPage;

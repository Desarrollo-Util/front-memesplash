import { useContext } from 'react';
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
	const { setAuth } = useContext(AuthContext);
	const { handleSubmit, register } = useForm();

	return (
		<div className='p-6'>
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
		`${process.env.NEXT_PUBLIC_BACKEND_URI}/login`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}
	);

	const responseData = await response.json();

	if (response.ok) {
		setAuth(responseData.token);
		localStorage.setItem('token', responseData.token);
	} else console.error(responseData.errorMessage);
};

export default LoginPage;

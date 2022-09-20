import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from '../components/atoms/button';
import InputPassword from '../components/atoms/inputs/input-password';
import InputText from '../components/atoms/inputs/input-text';
import { useLogin } from '../hooks/api/users';
import { noAuthGSSP } from '../lib/gssp/no-auth-gssp';

const FORM_NAMES = {
	EMAIL: 'email',
	PASSWORD: 'password'
};

const LoginPage = () => {
	const { push: routerPush } = useRouter();
	const { mutateAsync: loginMutation } = useLogin();
	const { handleSubmit, register } = useForm();

	return (
		<div className='p-6 container max-w-lg mx-auto'>
			<form
				className='flexcol-s-st gap-4'
				onSubmit={handleSubmit(formValues =>
					onSubmit(formValues, loginMutation, routerPush)
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

const onSubmit = async (formValues, loginMutation, routerPush) => {
	const { email, password } = formValues;

	try {
		await loginMutation({ email, password });
		routerPush('/auth');
	} catch (err) {
		console.log(err);
	}
};

export const getServerSideProps = noAuthGSSP;

export default LoginPage;

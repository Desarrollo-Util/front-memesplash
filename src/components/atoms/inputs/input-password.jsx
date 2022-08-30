import { forwardRef } from 'react';

const InputPassword = ({ label, ...props }, ref) => (
	<label className='input-wrapper'>
		<span className='input-label'>{label}</span>
		<input className='input-input' {...props} ref={ref} type='password' />
	</label>
);

export default forwardRef(InputPassword);

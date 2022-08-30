import { forwardRef } from 'react';

const InputText = ({ label, ...props }, ref) => (
	<label className='input-wrapper'>
		<span className='input-label'>{label}</span>
		<input className='input-input' {...props} ref={ref} />
	</label>
);

export default forwardRef(InputText);

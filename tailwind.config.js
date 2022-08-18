/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.jsx'],
	theme: {
		fontSize: {
			xs: '0.875rem', // 14px
			base: '1rem', // 16px
			lg: '1.25rem', // 20px
			xl: '2rem', // 32px
			'2xl': '3rem' // 48px
		},
		fontFamily: {
			sans: ['Inter', 'Helvetica', 'Arial'] // Default font
		},
		borderRadius: {
			sm: '0.5rem', // 8px
			md: '1rem' // 16px
		},
		boxShadow: {
			DEFAULT: '0px 0px 8px',
			md: '0px 0px 12px'
		},
		extend: {}
	},
	plugins: []
};

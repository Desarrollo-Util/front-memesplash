module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'standard',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'next/core-web-vitals',
		'prettier'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {}
};

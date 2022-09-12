export const isSSR = url => {
	const pathname = url.split('?')[0];
	return !pathname.endsWith('.json');
};

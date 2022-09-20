export const isSSR = ({ req, resolvedUrl }) => req.url === resolvedUrl;

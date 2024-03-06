const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/kr', {
			target: 'https://kr.api.riotgames.com',
			changeOrigin: true,
			pathRewrite: {
				'/kr': '',
			},
		}),
	);
	app.use(
		createProxyMiddleware('/asia', {
			target: 'https://asia.api.riotgames.com/',
			changeOrigin: true,
			pathRewrite: {
				'/asia': '',
			},
		}),
	);
};

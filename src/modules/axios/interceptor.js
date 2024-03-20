import axios from 'axios';

export const opggInstance = axios.create({
	timeout: 1000,
});

opggInstance.interceptors.request.use(
	(config) => {
		config.headers['Content-Type'] = 'application/json;charset=UTF-8';
		config.headers['accept'] = 'application/json';
		config.headers['Access-Control-Allow-Origin'] = '*';
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	},
);

export const riotInstance = axios.create({
	timeout: 1000,
});

riotInstance.interceptors.request.use(
	(config) => {
		config.headers['Content-Type'] = 'application/json';
		// config.headers['X-Riot-Token'] = process.env.REACT_APP_RIOT_API_KEY;
		config.headers['X-Riot-Token'] = 'RGAPI-037ae0d3-77d2-414a-8e4b-97790fefe069';
		
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	},
);

riotInstance.interceptors.response.use(
	(response) => {
		if (response.status === 404) {
			console.log('404 페이지로 넘어가야 함!');
		}
		
		return response;
	},
	async (error) => {
		if (error.response?.status === 401) {
			error.config.headers = {
				'Content-Type': 'application/json',
				'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
			};
			
			const response = await axios.request(error.config);
			return response;
		}
		return Promise.reject(error);
	},
);

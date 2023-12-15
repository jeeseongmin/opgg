import axios from 'axios';

export const SummonerService = {
	getSummonersByName: async (summonerName) => {
		return await axios.get(`https://op.gg/api/v1.0/internal/bypass/summoners/v2/kr/autocomplete?gameName=${summonerName}`, {
				headers: {
					'content-type': 'application/json;charset=UTF-8',
					accept: 'application/json,',
					'Access-Control-Allow-Origin': '*',
				},
			},
		)
			.then(function(data) {
				return data.data;
			}).catch((e) => {
				return e;
			});
	},
};
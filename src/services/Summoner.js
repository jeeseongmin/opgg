import axios from 'axios';

export const SummonerService = {
	getSummonersByName: async (summonerName) => {
		try {
			const {data} = await axios.get(
				`https://op.gg/api/v1.0/internal/bypass/summoners/v2/kr/autocomplete?gameName=${summonerName}`,
				{
					headers: {
						'content-type': 'application/json;charset=UTF-8',
						accept: 'application/json,',
						'Access-Control-Allow-Origin': '*',
					},
				},
			);
			return data.data;
		} catch (error) {
			console.log('error : ', error);
		}
	},
};

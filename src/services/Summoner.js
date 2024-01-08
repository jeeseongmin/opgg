import axios from 'axios';

export const getSummonersByName = async (summonerName) => {
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
};

export const getSummonerByPuuid = async (puuid) => {
	try {
		const {data} = await axios
			.get(`/kr/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
				headers: {
					'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
				},
			})
			.then((data) => {
				return data;
			});
		return data;
	} catch (error) {
		console.log(error);
	}
};
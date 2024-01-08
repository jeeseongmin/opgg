import axios from 'axios';

export const checkOpgg = async (summonerName) => {
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
		return 'error';
	}
};

export const checkRiot = async (summonerName, tagLine) => {
	try {
		const {puuid} = await axios.get(
			`/asia/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`,
			{
				headers: {
					'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
				},
			},
		);
		return puuid;
	} catch (error) {
		console.log('hahaha');
		console.log(error);
		return 'error';
	}
};

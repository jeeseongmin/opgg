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

	getSummonerByPUUID: async (puuid) => {
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
	},

	getHistory: async (puuid) => {
		try {
			const {data} = await axios.get(
				`/asia/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${0}&count=${20}`,
				{
					headers: {
						'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
					},
				},
			);
			return data;
		} catch (error) {
			console.log(error);
		}
	},

	getMatchInfo: async (matchID) => {
		try {
			const {data} = await axios.get(`/asia/lol/match/v5/matches/${matchID}`, {
				headers: {
					'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
				},
			});
			return data;
		} catch (error) {
			console.log(error);
		}
	},
};

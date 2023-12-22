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
	
	getAllSummonerByName: async (summonerName) => {
		return await axios.get(`https://www.op.gg/_next/data/Pz5yb-wmaXIHLSY2-ZUo9/en_US/summoners/search.json?q=${summonerName}&region=kr
`, {
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
	getSummonerByPUUID: async (puuid) => {
		const {data} = await axios.get(`/kr/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
			headers: {
				'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
			},
		})
			.then((data) => {
				return data;
			});
		return data;
	},
	/**
	 * 소환사의 전적 리스트
	 */
	getGameHistoryByAccountId: async (accountID) => {
		const {data} = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountID}`, {
			headers: {
				'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
			},
		})
			.then((data) => {
				return data;
			});
		return data;
	},
};
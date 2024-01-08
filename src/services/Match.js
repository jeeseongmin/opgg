import axios from 'axios';

export const getMatchListByPuuid = async (puuid) => {
	try {
		const {data} = await axios.get(
			`/asia/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${0}&count=${5}`,
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
	
};
export const getMatchById = async (matchID) => {
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
};


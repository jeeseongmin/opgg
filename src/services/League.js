import axios from 'axios';

export const LeagueService = {
	getLeagueEntriesById: async (summonerID) => {
		const { data } = await axios.get(`/kr/lol/league/v4/entries/by-summoner/${summonerID}`, {
			headers: {
				'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
			},
		});
		return data;
	},
};
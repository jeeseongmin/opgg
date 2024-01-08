import axios from 'axios';

export const getLeaguesBySummonerId = async (summonerId) => {
	try {
		const {data} = await axios.get(
			`/kr/lol/league/v4/entries/by-summoner/${summonerId}`,
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
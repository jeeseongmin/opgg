import {riotInstance} from 'modules/axios/interceptor';

export const getLeaguesBySummonerId = async (summonerId) => {
	try {
		const {data} = await riotInstance.get(`/kr/lol/league/v4/entries/by-summoner/${summonerId}`);
		
		return data;
	} catch (error) {
		console.log(error);
	}
};
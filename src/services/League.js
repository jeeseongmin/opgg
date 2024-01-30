import {riotInstance} from 'modules/axios/interceptor';
import dummy from 'data/dummy.json';

export const getLeaguesBySummonerId = async (summonerId) => {
	try {
		const {data} = await riotInstance.get(`/kr/lol/league/v4/entries/by-summoner/${summonerId}`);
		
		return data;
	} catch (error) {
		return dummy.leagueInfo;
	}
};
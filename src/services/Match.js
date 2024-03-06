import {riotInstance} from 'modules/axios/interceptor';
import dummy from 'data/dummy.json';

export const getMatchListByPuuid = async (puuid, cnt) => {
	try {
		const {data} = await riotInstance.get(`/asia/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=${0}&count=${cnt}`);
		
		return data;
	} catch (error) {
		return dummy.matchList;
	}
};

export const getMatchById = async (matchID) => {
	try {
		const res = await riotInstance.get(`/asia/lol/match/v5/matches/${matchID}`);
		
		return res.data;
	} catch (error) {
		return dummy.matchInfo[matchID];
	}
};


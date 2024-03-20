import {opggInstance, riotInstance} from 'modules/axios/interceptor';
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

export const getMatchListBySummonerId = async () => {
	try {
		const {data} = await opggInstance.get(`https://op.gg/api/v1.0/internal/bypass/games/kr/summoners/4b4tvMrpRRDLvXAiQ_Vmh5yMOsD0R3GPGTUVfIanp1Httg?&limit=20&hl=ko_KR&game_type=total`);
		return data;
	} catch (error) {
		console.log('error : ', error);
		return 'error';
	}
};


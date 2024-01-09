import {opggInstance, riotInstance} from 'modules/axios/interceptor';

export const getSummonersByName = async (summonerName) => {
	try {
		const {data} = await opggInstance.get(`https://op.gg/api/v1.0/internal/bypass/summoners/v2/kr/autocomplete?gameName=${summonerName}`);
		
		return data.data;
	} catch (error) {
		console.log('error : ', error);
	}
};

export const getSummonerByPuuid = async (puuid) => {
	try {
		const {data} = await riotInstance.get(`/kr/lol/summoner/v4/summoners/by-puuid/${puuid}`);
		
		return data;
	} catch (error) {
		console.log(error);
	}
};
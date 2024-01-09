import {opggInstance, riotInstance} from '../modules/axios/interceptor';

export const checkOpgg = async (summonerName) => {
	try {
		const {data} = await opggInstance.get(`https://op.gg/api/v1.0/internal/bypass/summoners/v2/kr/autocomplete?gameName=${summonerName}`);
		
		return data.data;
	} catch (error) {
		console.log('error : ', error);
		return 'error';
	}
};

export const checkRiot = async (summonerName, tagLine) => {
	try {
		const {puuid} = await riotInstance.get(`/asia/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`);
		
		return puuid;
	} catch (error) {
		console.log(error);
		return 'error';
	}
};

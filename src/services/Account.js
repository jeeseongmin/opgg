import {riotInstance} from 'modules/axios/interceptor';

export const getAccountPuuidByNameAndTag = async (summonerName, tagLine) => {
	try {
		const {data} = await riotInstance.get(`/asia/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`);
		
		return data.puuid;
	} catch (error) {
		console.log(error);
	}
};
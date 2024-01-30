import {riotInstance} from 'modules/axios/interceptor';
import dummy from 'data/dummy.json';

export const getAccountPuuidByNameAndTag = async (summonerName, tagLine) => {
	try {
		const {data} = await riotInstance.get(`/asia/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`);
		
		return data.puuid;
	} catch (error) {
		return dummy.accountInfo;
	}
};
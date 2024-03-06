import {opggInstance, riotInstance} from '../modules/axios/interceptor';
import perkData from 'data/perk.json';

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

/**
 * perkId가 있는 경우 primary
 * perkId가 없는 경우 sub
 * urlpath 반환
 */
export const getPerkInfoByPerkId = (style, perkId) => {
	const perks = perkData;
	const perk = perks.find((_perk) => {
		return _perk.id === style;
	});
	
	if (perkId) {
		let rune = perk.slots[0].runes.find((rune) => {
			return rune.id === perkId;
		});
		return rune.icon;
	}
	
	return perk.icon;
};
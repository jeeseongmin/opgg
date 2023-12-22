import championData from 'data/champion.json';

export const ChampionService = {
	getChampionInfo: (name) => {
		return championData.data[name];
	},
	getChampionListByName: (text) => {
		const champions = championData.data;
		return Object.keys(champions).filter((name) => name.includes(text));
	},
};
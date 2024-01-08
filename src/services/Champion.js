import championData from 'data/champion.json';

export const getChampionInfo = (name) => {
	return championData.data[name];
};

export const getChampionListByName = (name) => {
	const champions = championData.data;
	return Object.keys(champions).filter((name) => name.includes(name));
};
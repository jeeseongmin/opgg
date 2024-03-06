import championData from 'data/champion.json';

export const getChampionInfo = (name) => {
	return championData.data[name];
};

export const getChampionListByName = (championName) => {
	const champions = championData.data;
	const championNames = Object.values(champions).map((champion) => {
		return [champion.name, champion.id];
	});
	
	return championNames.filter((names) => {
		const [korName, engName] = names;
		return korName.includes(championName) || engName.toLowerCase().includes(championName.toLowerCase());
	}).map((arr) => arr[1]);
};
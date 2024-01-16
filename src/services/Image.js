export const getSummonerIconByIconNum = (iconNum) => {
	return `http://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${iconNum}.png`;
};

export const getChampionIconByChampionName = (championName) => {
	return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${championName}.png`;
	
};

export const getTierIconByTierName = (tier) => {
	return `https://opgg-static.akamaized.net/images/medals_new/${tier}.png?image=q_auto,f_webp,w_144&v=1702977255104`;
};

export const getSummonerSpellImageBySpellName = (spellName) => {
	return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${spellName}.png`;
};

export const getItemImageByItemNum = (itemNum) => {
	return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/${itemNum}.png`;
};
export const getSummonerIconByIconNum = (iconNum) => {
	return `https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${iconNum}.jpg?image=q_auto,f_webp,w_auto&v=1708681571653`;
};

export const getChampionIconByChampionName = (championName) => {
	return `https://opgg-static.akamaized.net/meta/images/lol/14.4.1/champion/${championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160,h_160&v=1708681571653`;
};

export const getTierIconByTierName = (tier) => {
	return `https://opgg-static.akamaized.net/images/medals_new/${tier}.png?image=q_auto,f_webp,w_144&v=1702977255104`;
};

export const getSummonerSpellImageBySpellName = (spellName) => {
	return `https://opgg-static.akamaized.net/meta/images/lol/14.4.1/spell/${spellName}.png?image=q_auto,f_webp,w_64,h_64&v=1708681571653`;
};

export const getItemImageByItemNum = (itemNum) => {
	return `https://opgg-static.akamaized.net/meta/images/lol/14.4.1/item/${itemNum}.png?image=q_auto,f_webp,w_64,h_64&v=1708681571653`;
};

export const getPerkIconByPerkUrl = (perkUrlPath) => {
	return `https://ddragon.leagueoflegends.com/cdn/img/${perkUrlPath}`;
};
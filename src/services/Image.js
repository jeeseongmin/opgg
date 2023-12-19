export const ImageService = {
	/**
	 * 소환사 아이콘 이미지
	 */
	getSummonerIconImage: (iconNum) => {
		return `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/profileicon/${iconNum}.png`;
	},
	/**
	 * 챔피언 아이콘 이미지
	 */
	getChampionImage: (championName) => {
		return `https://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${championName}.png`;
	},
};
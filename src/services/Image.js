export const ImageService = {
	/**
	 * 소환사 아이콘 이미지
	 */
	getSummonerIconImage: (iconNum) => {
		return `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${iconNum}.png`;
	},
	/**
	 * 챔피언 아이콘 이미지
	 */
	getChampionImage: (championName) => {
		return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championName}.png`;
	},

	/**
	 * 소환사 페이지 내 랭크 문양 이미지
	 */
	getTierImage: (tier) => {
		return `https://opgg-static.akamaized.net/images/medals_new/${tier}.png?image=q_auto,f_webp,w_144&v=1702977255104`;
	},
};

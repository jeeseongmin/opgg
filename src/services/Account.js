import axios from 'axios';

export const AccountService = {
	getAccountByNameAndTag: async (summonerName, tagLine) => {
		try {
			const {data} = await axios.get(
				`/asia/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`,
				{
					headers: {
						'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
					},
				},
			);
			return data.puuid;
		} catch (error) {
			console.log(error);
		}
	},
};

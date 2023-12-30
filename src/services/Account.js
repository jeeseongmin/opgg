import axios from 'axios';

export const AccountService = {
	getAccountByNameAndTag: async (summonerName, tagLine) => {
		try {
			const {puuid} = await axios
				.get(
					`/asia/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`,
					{
						headers: {
							'X-Riot-Token': process.env.REACT_APP_RIOT_API_KEY,
						},
					},
				)
				.then(function(data) {
					return data.data;
				})
				.catch((e) => {
					return e;
				});

			return puuid;
		} catch (error) {
			console.log(error);
		}
	},
};

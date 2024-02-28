export const getKda = (playerData) => {
	if (!playerData.challenges) return 0;
	let kda = playerData.challenges.kda;
	kda = String(Math.round(kda.toFixed(2) * 100) / 100);
	if (kda.length < 3) {
		if (kda.includes('.')) return `${kda}00`;
		else return `${kda}.00`;
	} else if (kda.length < 4) {
		if (kda.includes('.')) return `${kda}0`;
		else return `${kda}.0`;
	}
	return kda;
};

export const getPerKillingMinion = ({playerData, gameInfo}) => {
	if (!playerData.totalMinionsKilled || !gameInfo.gameDuration) return 0;
	let totalMinionsKilled = playerData.totalMinionsKilled;
	let duration = Math.floor(gameInfo.gameDuration / 60);
	return Math.floor((totalMinionsKilled / duration).toFixed(1) * 10) / 10;
};

export const getKillParticipation = (playerData) => {
	if (!playerData.challenges) return 0;
	let killParticipation = playerData.challenges.killParticipation;
	killParticipation = Math.round(killParticipation.toFixed(2) * 100);
	return killParticipation;
};
import spellData from 'data/spell.json';

export const getSpellNameBySpellCode = (spellCode) => {
	const spell = Object.values(spellData.data).find((spellInfo) => {
		return spellCode === spellInfo.key * 1;
	});
	if (spell?.id) return spell.id;
	return 'SummonerFlash';
};
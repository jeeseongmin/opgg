import spellData from 'data/spell.json';

export const getSpellNameBySpellCode = (spellCode) => {
	const spell = Object.values(spellData.data).filter((spellInfo) => {
		return spellCode === spellInfo.key * 1;
	});
	if (spell.length > 0 && spell[0].id) return spell[0].id;
	return 'SummonerFlash';
};
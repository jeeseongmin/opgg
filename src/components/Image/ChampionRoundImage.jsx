import React from 'react';
import {getChampionIconByChampionName} from '../../services/Image';

const ChampionImage = ({championId}) => {
	return (
		<img src={getChampionIconByChampionName(championId)} />
	);
};

export default ChampionImage;

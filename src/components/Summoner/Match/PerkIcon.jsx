import React from 'react';
import {getPerkIconByPerkUrl} from '../../../services/Image';
import {getPerkInfoByPerkId} from '../../../services/Common';

const PerkIcon = ({myData, type}) => {
	
	const getPerkIconUrl = (style, perkId) => {
		const urlPath = getPerkInfoByPerkId(style, perkId);
		return urlPath;
	};
	
	if (!myData?.perks?.styles) return null;
	let urlPath;
	
	if (type === 'primary') {
		urlPath = getPerkIconUrl(myData.perks.styles[0].style, myData.perks.styles[0].selections[0].perk);
		return <img
			className={'perk'}
			src={getPerkIconByPerkUrl(urlPath)} />;
	}
	
	urlPath = getPerkIconUrl(myData.perks.styles[1].style);
	return <img src={getPerkIconByPerkUrl(urlPath)} />;
	
};

export default PerkIcon;

import React from 'react';

const SummonerPreviewRow = ({data}) => {
	const {game_name, level, profile_image_url, tagline, solo_tier_info} = data;
	return (
		<div className={'previewRow'}>
			<div className={'profileImageWrapper'}>
				<img className={'profileImage'} src={profile_image_url} />
			</div>
			<div className={'profileInfoWrapper'}>
				<p>
					<span className={'gameName'}>{game_name}</span>
					<span className={'level'}>#{tagline}</span>
				</p>
				<p>
					{solo_tier_info && (
						<span>{`${solo_tier_info.tier} ${solo_tier_info.division} - ${solo_tier_info.lp}LP`}</span>
					)}
					{!solo_tier_info && <span>Level {level}</span>}
				</p>
			</div>
		</div>
	);
};

export default SummonerPreviewRow;

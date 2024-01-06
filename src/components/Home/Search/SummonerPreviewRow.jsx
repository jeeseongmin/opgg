import React from 'react';
import {Link} from 'react-router-dom';

const SummonerPreviewRow = ({data}) => {
	const {game_name, level, profile_image_url, tagline, solo_tier_info} = data;
	
	const TierInfo = () => {
		if (solo_tier_info) {
			return <span>{`${solo_tier_info.tier} ${solo_tier_info.division} - ${solo_tier_info.lp}LP`}</span>;
		}
	}
	
	const LevelInfo = () => {
		if (!solo_tier_info) {
			return <span>Level {level}</span>
		}
	}
	
	return (
		<Link to={`/summoners/${game_name}-${tagline}`}>
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
						<TierInfo />
						<LevelInfo />
					</p>
				</div>
			</div>
		</Link>
	);
};

export default SummonerPreviewRow;

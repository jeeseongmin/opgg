import React, {useEffect, useState} from 'react';
import {getTierIconByTierName} from 'services/Image';

const RankInfo = ({leagueData, queueType}) => {
	const [isUnranked, setIsUnranked] = useState(true);
	const {rank, tier, wins, losses, leaguePoints} = leagueData;
	
	useEffect(() => {
		setIsUnranked(!leagueData.leagueId);
	}, [leagueData]);
	
	const convertRank = (_rank) => {
		if (_rank === 'I') return 1;
		else if (_rank === 'II') return 2;
		else if (_rank === 'III') return 3;
		else if (_rank === 'IV') return 4;
	};
	
	const winningPercentage = () => {
		return Math.round((wins / (wins + losses)) * 100);
	};
	
	const getQueueTypeText = () => {
		if (queueType === 'solo') return '솔로랭크';
		return '자유랭크';
	};
	
	const UnRankedText = () => {
		if (!isUnranked) return null;
		return <p>Unranked</p>;
	};
	
	const RankStatus = () => {
		if (!isUnranked) {
			return <div className={'rankInfoBody'}>
				{/* 이미지 wrapper */}
				<div>
					<div className={`rankImage ${queueType}`}>
						<img src={getTierIconByTierName(tier.toLowerCase())} />
					</div>
				</div>
				{/* 포인트 정보 */}
				<div>
					<h3 className={`${queueType}`}>
						{tier} {convertRank(rank)}
					</h3>
					<p>{leaguePoints} LP</p>
				</div>
				
				<div>
						<span>
							{wins}승 {losses}패
						</span>
					<span>승률 {winningPercentage()}%</span>
				</div>
			</div>;
		}
	};
	return (
		<section className={'rankInfo'}>
			<div className={'rankInfoHeader'}>
				<p>{getQueueTypeText()}</p>
				<UnRankedText />
			</div>
			<RankStatus />
		</section>
	);
};

export default RankInfo;

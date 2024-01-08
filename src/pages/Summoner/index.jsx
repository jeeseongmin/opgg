import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AccountService} from 'services/Account';
import {SummonerService} from 'services/Summoner';
import {LeagueService} from 'services/League';
import 'pages/Summoner/Summoner.scss';
import {ImageService} from 'services/Image';
import Matches from 'pages/Summoner/Matches';
import RankInfo from 'components/Summoner/RankInfo';

const Summoner = () => {
	const {fullName} = useParams();
	const [gameName, tag] = fullName.split('-');
	
	const [summonerInfo, setSummonerInfo] = useState({});
	
	const [soloRankInfo, setSoloRankInfo] = useState({});
	const [flexRankInfo, setFlexRankInfo] = useState({});
	const [matchList, setMatchList] = useState([]);
	
	useEffect(() => {
		getInfo();
	}, []);
	
	const getInfo = async () => {
		const puuid = await AccountService.getAccountByNameAndTag(gameName, tag);
		const _summonerInfo = await SummonerService.getSummonerByPUUID(puuid);
		setSummonerInfo(_summonerInfo);
		const _leagueList = await LeagueService.getLeagueEntriesById(
			_summonerInfo.id,
		);
		
		_leagueList.map((league, index) => {
			if (league.queueType.includes('SOLO')) {
				setSoloRankInfo(league);
			} else if (league.queueType.includes('FLEX')) {
				setFlexRankInfo(league);
			}
		});
		
		const _matchList = await SummonerService.getHistory(_summonerInfo.puuid);
		setMatchList(_matchList);
	};
	
	const onError = ({currentTarget}) => {
		currentTarget.onerror = null;
		currentTarget.src = `/images/championImages/${currentTarget.id}_0.jpg`;
	};
	
	return (
		<main className={'summonerWrapper'}>
			<nav className={'summonerHeader'}>
				<div className={'summoner'}>
					{/* 상단 소환사 정보 */}
					<div className={'summonerInfoWrapper'}>
						<div className={'iconImageWrapper'}>
							{summonerInfo.profileIconId && (
								<img
									className='iconImage'
									src={ImageService.getSummonerIconImage(
										summonerInfo.profileIconId,
									)}
									onError={onError}
								/>
							)}
							<div className={'summonerLevel'}>
								<span>{summonerInfo.summonerLevel}</span>
							</div>
						</div>
						
						<div className={'summonerInfo'}>
							<div className={'summonerIntro'}>
								<span className={'summonerName'}>{gameName}</span>
								<span className={'tagName'}>#{tag}</span>
							</div>
							<div className={'prevName'}>Prev. {summonerInfo.name}</div>
							<div>
								<button className={'refreshHistory'}>전적 갱신</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
			
			<div className={'summonerBody'}>
				<div className={'summonerLeagueWrapper'}>
					<div className={'infosWrapper'}>
						{soloRankInfo && (
							<RankInfo leagueData={soloRankInfo} queueType={'solo'} />
						)}
						{flexRankInfo && (
							<RankInfo leagueData={flexRankInfo} queueType={'flex'} />
						)}
					</div>
					<Matches matchList={matchList} />
				</div>
			</div>
		</main>
	);
};

export default Summoner;

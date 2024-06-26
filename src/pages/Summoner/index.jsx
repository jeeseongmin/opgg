import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import 'pages/Summoner/Summoner.scss';
import RankInfo from 'components/Summoner/RankInfo';
import Match from 'pages/Summoner/Match/index';
import {getSummonerByPuuid} from 'services/Summoner';
import {getLeaguesBySummonerId} from 'services/League';
import {getSummonerIconByIconNum} from 'services/Image';
import {getMatchListByPuuid} from 'services/Match';
import {getAccountPuuidByNameAndTag} from 'services/Account';
import data from 'data/dummy.json';
import MatchInfo from 'pages/Summoner/Match/MatchInfo';
import ChampionImage from 'components/Image/ChampionRoundImage';
import {getColorClass} from 'utils/CommonUtils';
import useMenu from 'hooks/useMenu';
import {CircularProgress} from '@mui/material';

const Summoner = () => {
	useMenu({menuName: 'SUMMONER'});
	const {fullName} = useParams();
	
	const [nameInfo, setNameInfo] = useState({
		gameName: '',
		tag: '',
	});
	const [summonerInfo, setSummonerInfo] = useState({});
	const [soloRankInfo, setSoloRankInfo] = useState({});
	const [flexRankInfo, setFlexRankInfo] = useState({});
	const [season, setSeason] = useState('S2024 S1');
	const [matchList, setMatchList] = useState([]);
	const [mostRankChampions, setMostRankchampions] = useState([...data.mostChampions.soloRank]);
	const [selectedTab, setSelectedTab] = useState('전체');
	const [isDone, setIsDone] = useState(false);
	
	useEffect(() => {
		getMostRankChampions();
	}, [season]);
	
	useEffect(() => {
		getInfo();
	}, [selectedTab]);
	
	const getInfo = async () => {
		setIsDone(false);
		if (selectedTab === '자유랭크') setMatchList([]);
		else {
			const [_gameName, _tag] = fullName.split('-');
			const data = await getAccountPuuidByNameAndTag(_gameName, _tag);
			const _summonerInfo = await getSummonerByPuuid(data.puuid);
			setNameInfo({
				gameName: data.gameName,
				tag: data.tagLine,
			});
			setSummonerInfo(_summonerInfo);
			const _leagueList = await getLeaguesBySummonerId(
				_summonerInfo.id,
			);
			
			_leagueList.map((league, index) => {
				if (league.queueType.includes('SOLO')) {
					setSoloRankInfo(league);
				} else if (league.queueType.includes('FLEX')) {
					setFlexRankInfo(league);
				}
			});
			
			const _matchList = await getMatchListByPuuid(_summonerInfo.puuid, 10);
			if (_matchList.length > 0) {
				setMatchList(_matchList);
			}
		}
		
		setIsDone(true);
	};
	
	const getMostRankChampions = () => {
		if (season === '자유랭크') setMostRankchampions([...data.mostChampions.flexRank]);
		else setMostRankchampions([...data.mostChampions.soloRank]);
	};
	
	const onError = ({currentTarget}) => {
		currentTarget.onerror = null;
		currentTarget.src = `/images/championImages/${currentTarget.id}_0.jpg`;
	};
	
	const ProfileIcon = () => {
		if (!summonerInfo.profileIconId) return null;
		return <img
			className='iconImage'
			src={getSummonerIconByIconNum(
				summonerInfo.profileIconId,
			)}
			onError={onError}
		/>;
	};
	
	const MostRankChampions = () => {
		if (mostRankChampions.length === 0) return <div className={'emptySeason'}>기록된 전적이 없습니다.</div>;
		return <div className={'mostChampionWrapper'}>
			{mostRankChampions.map((championInfo) => {
					return <div className={'mostChampion'} key={championInfo.championId}>
						<div className={'rowColumn'}>
							<ChampionImage championId={championInfo.championId} />
							<div className={'infoColumn'}>
								<p>{championInfo.championName}</p>
								<p>CS {championInfo.cs} ({championInfo.csAverage})</p>
							</div>
						</div>
						<div className={`infoColumn ${getColorClass({type: 'grade', point: championInfo.grade})}`}>
							<p>{championInfo.grade}:1 평점</p>
							<p>{championInfo.kill} / {championInfo.death} / {championInfo.assist}</p>
						</div>
						<div className={`infoColumn ${getColorClass({
							type: 'percentOfWinning',
							point: championInfo.percentOfWinning,
						})}`}>
							<p>{championInfo.percentOfWinning}%</p>
							<p>{championInfo.playCount} 게임</p>
						</div>
					</div>;
				},
			)}
		</div>;
		
	};
	
	return (
		<main className={'summonerWrapper'}>
			<nav className={'summonerHeader'}>
				<div className={'summoner'}>
					{/* 상단 소환사 정보 */}
					<div className={'summonerInfoWrapper'}>
						<div className={'iconImageWrapper'}>
							<ProfileIcon />
							<div className={'summonerLevel'}>
								<span>{summonerInfo.summonerLevel}</span>
							</div>
						</div>
						
						<div className={'summonerInfo'}>
							<div className={'summonerIntro'}>
								<span className={'summonerName'}>{nameInfo.gameName}</span>
								<span className={'tagName'}>#{nameInfo.tag}</span>
							</div>
							<div className={'prevName'}>Prev. {summonerInfo.name}</div>
							<div>
								<button className={'refreshHistory'} onClick={() => {
									window.location.reload();
								}}>전적 갱신
								</button>
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
						<div className={'championInfoWrapper'}>
							<div>
								<button onClick={() => setSeason('S2024 S1')} className={`${season === 'S2024 S1' ? 'selected' : ''}`}>
									S2024 S1
								</button>
								<button onClick={() => setSeason('솔로랭크')} className={`${season === '솔로랭크' ? 'selected' : ''}`}>
									솔로랭크
								</button>
								<button onClick={() => setSeason('자유랭크')} className={`${season === '자유랭크' ? 'selected' : ''}`}>
									자유랭크
								</button>
							</div>
							<MostRankChampions />
						</div>
					</div>
					<section className={'matchesWrapper'}>
						<MatchInfo selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
						{
							isDone ?
								<div className={'matchList'}>
									{
										matchList.map((matchId, index) => {
											return <Match key={matchId} matchId={matchId} gameName={nameInfo.gameName} />;
										})
									}
								</div> :
								<div className={'emptyList'}>
									<CircularProgress />
								</div>
						}
					</section>
				</div>
			</div>
		</main>
	);
};

export default Summoner;

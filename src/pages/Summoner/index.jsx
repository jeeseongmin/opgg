import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import 'pages/Summoner/Summoner.scss';
import RankInfo from 'components/Summoner/RankInfo';
import Match from 'pages/Summoner/Match/index';
import {getSummonerByPuuid} from 'services/Summoner';
import {getLeaguesBySummonerId} from 'services/League';
import {getChampionIconByChampionName, getSummonerIconByIconNum} from 'services/Image';
import {getMatchListByPuuid} from 'services/Match';
import {getAccountPuuidByNameAndTag} from 'services/Account';
import data from 'data/dummy.json';

const Summoner = () => {
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
	const [mostRankChampions, setMostRankchampions] = useState([...data.mostChampions.soloRank,
	]);
	
	useEffect(() => {
		getMostRankChampions();
	}, [season]);
	
	useEffect(() => {
		getInfo();
	}, []);
	
	const getInfo = async () => {
		const [_gameName, _tag] = fullName;
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
	
	const getColor = ({type, point}) => {
		if (type === 'grade') {
			if (point >= 5) return 'best';
			else if (point >= 4) return 'excellent';
			else if (point >= 3) return 'good';
			else return 'normal';
		} else {
			if (point >= 50) return 'excellent';
			else return 'normal';
		}
		
	};
	
	const MostRankChampions = () => {
		if (mostRankChampions.length === 0) return <div className={'emptySeason'}>기록된 전적이 없습니다.</div>;
		return <div className={'mostChampionWrapper'}>
			{mostRankChampions.map((championInfo) => {
					return <div className={'mostChampion'} key={championInfo.championId}>
						<div className={'rowColumn'}>
							<img src={getChampionIconByChampionName(championInfo.championId)} />
							<div className={'infoColumn'}>
								<p>{championInfo.championName}</p>
								<p>CS {championInfo.cs} ({championInfo.csAverage})</p>
							</div>
						</div>
						<div className={`infoColumn ${getColor({type: 'grade', point: championInfo.grade})}`}>
							<p>{championInfo.grade}:1 평점</p>
							<p>{championInfo.kill} / {championInfo.death} / {championInfo.assist}</p>
						</div>
						<div className={`infoColumn ${getColor({type: 'percentOfWinning', point: championInfo.percentOfWinning})}`}>
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
						<div className={'matchList'}>
							{
								matchList.length > 0 && matchList.map((matchId, index) => {
									return <Match key={matchId} matchId={matchId} gameName={nameInfo.gameName} />;
								})
							}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Summoner;

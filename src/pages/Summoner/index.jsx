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

const Summoner = () => {
	const {fullName} = useParams();
	
	const [nameInfo, setNameInfo] = useState({
		gameName: '',
		tag: '',
	});
	const [summonerInfo, setSummonerInfo] = useState({});
	const [soloRankInfo, setSoloRankInfo] = useState({});
	const [flexRankInfo, setFlexRankInfo] = useState({});
	const [matchList, setMatchList] = useState([]);
	
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
								<button className={'selected'}>
									<div>S2024 S1</div>
								</button>
								<button>솔로랭크</button>
								<button>자유랭크</button>
							</div>
							<div>body</div>
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

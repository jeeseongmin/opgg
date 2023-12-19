import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AccountService} from '../../services/Account';
import {SummonerService} from '../../services/Summoner';
import {ImageService} from '../../services/Image';
import {LeagueService} from '../../services/League';
import 'pages/Summoner/Summoner.scss';

const Summoner = () => {
	const {fullName} = useParams();
	const [summonerInfo, setSummonerInfo] = useState({});
	const [leagueInfo, setLeagueInfo] = useState({});
	
	useEffect(() => {
		getInfo();
	}, []);
	
	const getInfo = async () => {
		
		await getRealName();
	};
	
	const getRealName = async () => {
		const [gameName, tag] = fullName.split('-');
		const puuid = await AccountService.getAccountByNameAndTag(gameName, tag);
		// accountId, id, name, profileIconId, summonerLevel
		const _summonerInfo = await SummonerService.getSummonerByPUUID(puuid);
		setSummonerInfo(_summonerInfo);
		// leagueId, leaguePoints, wins, losses, queueTpye, rank, summonerId, summonerName, tier,
		const _leagueInfo = await LeagueService.getLeagueEntriesById(_summonerInfo.id);
		setLeagueInfo(_leagueInfo);
		console.log(leagueInfo);
		
	};
	return (
		<div className={'summonerWrapper'}>
			<div className={'summoner'}>
				<div className={'summonerInfoWrapper'}>
					
					<div className={'iconImageWrapper'}>
						{summonerInfo.profileIconId &&
							<img className='iconImage' src={ImageService.getSummonerIconImage(summonerInfo.profileIconId)} />}
						<div className={'summonerLevel'}>
							<span>{summonerInfo.summonerLevel}</span>
						</div>
					</div>
					
					<div className={'summonerInfo'}>
					
					</div>
				</div>
				<div className={'summonerLeagueWrapper'}>
					<div>
						<p>코뚱잉</p> <p>#KR1</p>
					</div>
				</div>
			
			</div>
		</div>
	);
};

export default Summoner;

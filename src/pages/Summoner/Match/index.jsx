import React, {useEffect, useState} from 'react';
import 'pages/Summoner/Match/Match.scss';
import {getMatchById} from 'services/Match';
import {getChampionIconByChampionName, getItemImageByItemNum, getSummonerSpellImageBySpellName} from 'services/Image';
import {getSpellNameBySpellCode} from 'services/Spell';
import {IoIosArrowDown} from 'react-icons/io';
import ItemImageComponent from 'components/Summoner/Match/ItemImageComponent';
import MatchDetail from 'components/Summoner/Match/MatchDetail';
import PerkIcon from 'components/Summoner/Match/PerkIcon';
import {getKda, getKillParticipation, getPerKillingMinion} from 'utils/MatchUtils';
import {getDiffDateToKr, getDuration} from 'utils/DateUtils';

const Match = ({matchId, gameName}) => {
	const [myData, setMyData] = useState({});
	const [toggleTeamDetailInfo, setToggleTeamDetailInfo] = useState(false);
	const [gameInfo, setGameInfo] = useState({});
	const [teamData, setTeamData] = useState([]);
	const [blueTeam, setBlueTeam] = useState([]);
	const [redTeam, setRedTeam] = useState([]);
	
	useEffect(() => {
		getMatchInfo();
	}, [matchId]);
	
	const getMatchInfo = async () => {
		const data = await getMatchById(matchId);
		if (data) {
			setGameInfo(data.info);
			const participants = data.info.participants;
			
			if (participants?.length) {
				setTeamData(participants);
				const _myData = participants.find((data) => {
					return data.summonerName === gameName;
				});
				setMyData(_myData);
				setBlueTeam(participants.slice(0, 5));
				setRedTeam(participants.slice(5, 10));
			}
		}
	};
	
	const onError = ({currentTarget}) => {
		currentTarget.onerror = null;
		currentTarget.src = `/images/championImages/${'ziggs'}_0.jpg`;
	};
	
	const PlayerComponent = ({playerData}) => {
		if (!playerData) return null;
		if (playerData.riotIdGameName !== gameName && playerData.summonerName !== gameName) {
			return <div key={playerData.puuid}>
				<img
					className={`teamMemberImage`}
					src={getChampionIconByChampionName(playerData.championName)}
					onError={onError}
				/>
				<p className={'teamMemberName'}>{playerData.riotIdGameName || playerData.summonerName}</p>
			</div>;
		}
		return <div key={playerData.puuid}>
			<img
				className={`myImage`}
				src={getChampionIconByChampionName(playerData.championName)}
				onError={onError}
			/>
			<p className={'myName'}>{playerData.riotIdGameName || playerData.summonerName}</p>
		</div>;
	};
	
	if (gameInfo.gameId) {
		return (
			<>
				<section className={`matchComponentWrapper`}>
					<div className={`matchComponent ${myData.win ? 'winComponent' : 'loseComponent'}`}>
						<div className={'leftBorder'}></div>
						<div className={'matchInfo'}>
							<div>
								<p className={'rankType'}><b>랭크</b></p>
								<p>{getDiffDateToKr({gameInfo})}</p>
							</div>
							<div className={'hr'}></div>
							<div>
								<p><b>{myData.win ? '승리' : '패배'}</b></p>
								<p>{getDuration({gameInfo})}</p>
							</div>
						</div>
						<div className={'championInfo'}>
							<div>
								<div className={'basicInfo'}>
									<div className={'championImageWrapper'}>
										<img
											className={'championImage'}
											src={getChampionIconByChampionName(myData.championName)}
											onError={onError}
										/>
										<div className={'level'}>{myData.champLevel}</div>
									</div>
									<div className={'spellWrapper'}>
										<img
											src={getSummonerSpellImageBySpellName(getSpellNameBySpellCode(myData.summoner1Id))}
										/>
										<img
											src={getSummonerSpellImageBySpellName(getSpellNameBySpellCode(myData.summoner2Id))}
										/>
									</div>
									<div className={'perkWrapper'}>
										<PerkIcon type={'primary'} />
										<PerkIcon type={'sub'} />
									</div>
									<div className={'scoreWrapper'}>
										<p><b>{myData.kills} / <span>{myData.deaths}</span> / {myData.assists}</b></p>
										<p className={'grade'}>{getKda({playerData: myData})}:1 평점</p>
									</div>
								</div>
								<div className={'detailInfo'}>
									<p className={'killContribution'}>킬관여 {getKillParticipation({playerData: myData})}%</p>
									<p>제어 와드 {myData.visionWardsBoughtInGame}</p>
									<p>CS {myData.totalMinionsKilled} ({getPerKillingMinion({playerData: myData, gameInfo})})</p>
									<p>Gold 3</p>
								</div>
							</div>
							<div>
								{myData.puuid &&
									<div className={'itemInfo'}>
										{[0, 1, 2, 3, 4, 5].map((itemNum) => {
											return <ItemImageComponent key={itemNum} data={myData} itemNum={itemNum} />;
										})}
										<img
											className={'ward'}
											src={getItemImageByItemNum(myData.item6)} />
									</div>
								}
								<div className={'contribution'}>8th</div>
							</div>
						</div>
						<div className={'teamInfo'}>
							{
								teamData.map((playerData, index) => {
									return <PlayerComponent key={playerData.puuid} playerData={playerData} />;
								})
							}
						</div>
						<div className={'toggleBtn'} onClick={() => setToggleTeamDetailInfo(!toggleTeamDetailInfo)}>
							<IoIosArrowDown className={`arrowIcon ${toggleTeamDetailInfo ? 'rotate' : ''}`} />
						</div>
					</div>
					
					{toggleTeamDetailInfo &&
						<section className={'matchDetailWrapper'}>
							{
								gameInfo?.teams && gameInfo.teams.map((team) => {
									return <MatchDetail key={team.teamId} playerData={myData} team={team} gameInfo={gameInfo}
																			teamInfo={team.teamId === 100 ? redTeam : blueTeam} />;
								})
							}
						</section>
					}
				</section>
			
			</>
		);
	} else return <></>;
};

export default Match;

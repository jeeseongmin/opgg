import React, {useCallback, useEffect, useState} from 'react';
import 'pages/Summoner/Match/Match.scss';
import {getMatchById} from 'services/Match';
import {
	getChampionIconByChampionName,
	getItemImageByItemNum,
	getPerkIconByPerkUrl,
	getSummonerSpellImageBySpellName,
} from 'services/Image';
import {getSpellNameBySpellCode} from 'services/Spell';
import {getPerkInfoByPerkId} from 'services/Common';
import {IoIosArrowDown} from 'react-icons/io';

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
	};
	
	const LeftBorder = () => {
		return <div className={'leftBorder'}></div>;
	};
	
	const onError = ({currentTarget}) => {
		currentTarget.onerror = null;
		currentTarget.src = `/images/championImages/${'ziggs'}_0.jpg`;
	};
	
	const getDuration = useCallback(() => {
		let duration = gameInfo.gameDuration;
		if (!duration) return null;
		let hour, minute, second;
		
		if (duration >= 3600) {
			hour = Math.floor(Math.floor(duration / 60) / 60);
			minute = Math.floor((duration - (hour * 60 * 60)) / 60);
			second = duration - (hour * 60 * 60) - (minute * 60);
			return `${hour}시 ${minute}분 ${second}초`;
		}
		if (duration < 3600) {
			minute = Math.floor(duration / 60);
			second = duration - (minute * 60);
			return `${minute}분 ${second}초`;
		}
		
	}, [gameInfo]);
	
	function dateDiff() {
		console.log(gameInfo);
		let endTime = gameInfo.gameEndTimestamp;
		if (!endTime) return null;
		let before_date = Math.floor(new Date(endTime).getTime() / 1000);
		let now_date = Math.floor(Date.now() / 1000);
		let now = Date.now();
		if (sameDate(new Date(endTime), new Date(now))) {
			// 시간 계산하기
			let beforeHours = new Date(endTime).getHours();
			let afterHours = new Date(now).getHours();
			if (beforeHours === afterHours) {
				let beforeMinutes = new Date(endTime).getMinutes();
				let afterMinutes = new Date(now).getMinutes();
				return `${afterMinutes - beforeMinutes}분 전`;
			}
			return `${afterHours - beforeHours}시간 전`;
		}
		
		return `${Math.floor((now_date - before_date) / (60 * 60 * 24))}일 전`;
		
		function sameDate(before, after) {
			let sameYear = before.getFullYear() === after.getFullYear();
			let sameMonth = before.getMonth() === after.getMonth();
			let sameDate = before.getDate() === after.getDate();
			
			if (sameYear && sameMonth && sameDate) return true;
			return false;
		}
	}
	
	const ItemImageComponent = ({data, itemNum}) => {
		let itemCode = data[`item${itemNum}`];
		if (itemCode === 0) return <div className={'emptyItem'}></div>;
		return <img
			className={'emptyItem'}
			src={getItemImageByItemNum(data[`item${itemNum}`])} />;
	};
	
	const getKda = (data) => {
		if (!data.challenges) return 0;
		let kda = data.challenges.kda;
		kda = String(Math.round(kda.toFixed(2) * 100) / 100);
		if (kda.length < 3) {
			if (kda.includes('.')) return `${kda}00`;
			else return `${kda}.00`;
		} else if (kda.length < 4) {
			if (kda.includes('.')) return `${kda}0`;
			else return `${kda}.0`;
		}
		
		return kda;
	};
	
	const getKillParticipation = () => {
		if (!myData.challenges) return 0;
		let killParticipation = myData.challenges.killParticipation;
		killParticipation = Math.round(killParticipation.toFixed(2) * 100);
		return killParticipation;
	};
	
	const getPerKillingMinion = (data) => {
		if (!data.totalMinionsKilled || !gameInfo.gameDuration) return 0;
		let totalMinionsKilled = data.totalMinionsKilled;
		let duration = Math.floor(gameInfo.gameDuration / 60);
		return Math.floor((totalMinionsKilled / duration).toFixed(1) * 10) / 10;
	};
	
	const PlayerComponent = ({playerData}) => {
		if (!playerData) return null;
		if (playerData.riotIdGameName !== gameName) {
			return <div key={playerData.puuid}>
				<img
					className={`teamMemberImage`}
					src={getChampionIconByChampionName(playerData.championName)}
					onError={onError}
				/>
				<p className={'teamMemberName'}>{playerData.riotIdGameName}</p>
			</div>;
		}
		return <div key={playerData.puuid}>
			<img
				className={`myImage`}
				src={getChampionIconByChampionName(playerData.championName)}
				onError={onError}
			/>
			<p className={'myName'}>{playerData.riotIdGameName}</p>
		</div>;
	};
	
	const getPerkIconUrl = (style, perkId) => {
		const urlPath = getPerkInfoByPerkId(style, perkId);
		return urlPath;
	};
	
	const PerkIcon = ({type}) => {
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
	
	const TeamComponent = ({team}) => {
		const teamColor = team.teamId === 100 ? '레드팀' : '블루팀';
		const teamInfo = team.teamId === 100 ? redTeam : blueTeam;
		const result = teamInfo[0].win ? '승리' : '패배';
		
		return <table key={team} className={'teamDetailWrapper'}>
			<thead className={'teamDetailHeader'}>
			<tr>
				<th colSpan={'3'}>{result} ({teamColor})</th>
				<th>KDA</th>
				<th colSpan={'2'}>피해량</th>
				<th>와드</th>
				<th>CS</th>
				<th colSpan={'3'}>아이템</th>
			</tr>
			</thead>
			<tbody className={teamInfo[0].win ? 'winComponent' : 'loseComponent'}>
			{
				teamInfo.map((member) => {
					return <tr key={member.puuid}>
						<th colSpan={'3'}>
							<div className={'basicInfo'}>
								<div className={'championImageWrapper'}>
									<img
										className={'championImage'}
										src={getChampionIconByChampionName(member.championName)}
										onError={onError}
									/>
									<div className={'level'}>{member.champLevel}</div>
								</div>
								<div className={'spellWrapper'}>
									<img
										src={getSummonerSpellImageBySpellName(getSpellNameBySpellCode(member.summoner1Id))}
									/>
									<img
										src={getSummonerSpellImageBySpellName(getSpellNameBySpellCode(member.summoner2Id))}
									/>
								</div>
								<div className={'perkWrapper'}>
									<PerkIcon type={'primary'} />
									<PerkIcon type={'sub'} />
								</div>
								
								<div className={'playerName'}>
									<p>{member.riotIdGameName}</p>
									<p>Diamond 2</p>
								</div>
							</div>
						</th>
						<th>
							<div className={'scoreWrapper'}>
								<p>{member.kills}/{member.deaths}/{member.assists}</p>
								<p className={'grade'}>{getKda(member)}:1</p>
							</div>
						</th>
						<th colSpan={'2'}>
							<div className={'damageWrapper'}>
								<div className={'progress'}>
									<p>{member.totalDamageDealtToChampions.toLocaleString('ko-KR')}</p>
									<div className={'barChart'}>
										<div className={'fill'} style={{width: '54%'}}></div>
									</div>
								</div>
								<div className={'progress'}>
									<p>{member.totalDamageTaken.toLocaleString('ko-KR')}</p>
									<div className={'barChart-taken'}>
										<div className={'fill'} style={{width: '70%'}}></div>
									</div>
								</div>
							</div>
						</th>
						<th>
							<div className={'wardWrapper'}>
								<p>{member.visionWardsBoughtInGame}</p>
								<p>{member.wardsPlaced} / {member.wardsKilled}</p>
							</div>
						</th>
						<th>
							<div className={'csWrapper'}>
								<p>{member.totalMinionsKilled}</p>
								<p>분당 {getPerKillingMinion(member)}</p>
							</div>
						</th>
						<th colSpan={'3'}>
							<div className={'itemWrapper'}>
								{[0, 1, 2, 3, 4, 5].map((itemNum) => {
									return <ItemImageComponent key={itemNum} data={member} itemNum={itemNum} />;
								})}
								<img
									className={'ward'}
									src={getItemImageByItemNum(myData.item6)} />
							</div>
						
						</th>
					</tr>;
				})
			}
			</tbody>
		</table>;
	};
	
	return (
		<>
			<section className={`matchComponentWrapper`}>
				<div className={`matchComponent ${myData.win ? 'winComponent' : 'loseComponent'}`}>
					<LeftBorder />
					<div className={'matchInfo'}>
						<div>
							<p className={'rankType'}><b>랭크</b></p>
							<p>{dateDiff()}</p>
						</div>
						<div className={'hr'}></div>
						<div>
							<p><b>{myData.win ? '승리' : '패배'}</b></p>
							<p>{getDuration()}</p>
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
									<p className={'grade'}>{getKda(myData)}:1 평점</p>
								</div>
							</div>
							<div className={'detailInfo'}>
								<p className={'killContribution'}>킬관여 {getKillParticipation()}%</p>
								<p>제어 와드 {myData.visionWardsBoughtInGame}</p>
								<p>CS {myData.totalMinionsKilled} ({getPerKillingMinion(myData)})</p>
								<p>Gold 3</p>
							</div>
						</div>
						<div>
							<div className={'itemInfo'}>
								{[0, 1, 2, 3, 4, 5].map((itemNum) => {
									return <ItemImageComponent key={itemNum} data={myData} itemNum={itemNum} />;
								})}
								<img
									className={'ward'}
									src={getItemImageByItemNum(myData.item6)} />
							</div>
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
								return <TeamComponent key={team.teamId} team={team} />;
							})
						}
					
					</section>
				}
			</section>
		
		</>
	);
};

export default Match;

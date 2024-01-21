import React, {useCallback, useEffect, useState} from 'react';
import {getMatchById} from 'services/Match';
import {getChampionIconByChampionName, getItemImageByItemNum, getSummonerSpellImageBySpellName} from 'services/Image';
import {getSpellNameBySpellCode} from '../../../services/Spell';

const Match = ({matchId, fullName}) => {
	const [gameName, tag] = fullName.split('-');
	const [myData, setMyData] = useState([]);
	const [gameInfo, setGameInfo] = useState({});
	const [teamData, setTeamData] = useState([]);
	
	useEffect(() => {
		getMatchInfo();
	}, [matchId]);
	
	const getMatchInfo = async () => {
		const {data} = await getMatchById(matchId);
		setGameInfo(data.info);
		const participants = data.info.participants;
		
		if (participants?.length) {
			setTeamData(participants);
			const _myData = participants.find((data) => {
				return data.summonerName === gameName;
			});
			setMyData(_myData);
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
			if ((before.getFullYear() === after.getFullYear())
				&& (before.getMonth() === after.getMonth())
				&& (before.getDate() === after.getDate())
			) return true;
			return false;
		}
	}
	
	const ItemImageComponent = ({itemNum}) => {
		let itemCode = myData[`item${itemNum}`];
		if (itemCode === 0) return <div className={'emptyItem'}></div>;
		return <img
			src={getItemImageByItemNum(myData[`item${itemNum}`])} />;
	};
	
	const getKda = () => {
		if (!myData.challenges) return 0;
		let kda = myData.challenges.kda;
		kda = String(Math.round(kda.toFixed(2) * 100) / 100);
		if (kda.length < 4) return `${kda}0`;
		return kda;
	};
	
	const getKillParticipation = () => {
		if (!myData.challenges) return 0;
		let killParticipation = myData.challenges.killParticipation;
		killParticipation = Math.round(killParticipation.toFixed(2) * 100) / 100;
		return killParticipation * 100;
	};
	
	const getPerKillingMinion = () => {
		if (!myData.totalMinionsKilled || !gameInfo.gameDuration) return 0;
		let totalMinionsKilled = myData.totalMinionsKilled;
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
	
	return (
		<section className={`matchComponent ${myData.win ? 'winComponent' : 'loseComponent'}`}>
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
						<div className={'runeWrapper'}>
							<img
								className={'rune'}
								src={'https://opgg-static.akamaized.net/meta/images/lol/perk/8229.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
							<img
								src='https://opgg-static.akamaized.net/meta/images/lol/perkStyle/8000.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104' />
						</div>
						<div className={'scoreWrapper'}>
							<p><b>{myData.kills} / <span>{myData.deaths}</span> / {myData.assists}</b></p>
							<p className={'grade'}>{getKda()}:1 평점</p>
						</div>
					</div>
					<div className={'detailInfo'}>
						<p className={'killContribution'}>킬관여 {getKillParticipation()}%</p>
						<p>제어 와드 {myData.visionWardsBoughtInGame}</p>
						<p>CS {myData.totalMinionsKilled} ({getPerKillingMinion()})</p>
						<p>Gold 3</p>
					</div>
				</div>
				<div>
					<div className={'itemInfo'}>
						{[0, 1, 2, 3, 4, 5].map((itemNum) => {
							return <ItemImageComponent key={itemNum} itemNum={itemNum} />;
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
			<div className={'toggleBtn'}></div>
		</section>
	);
};

export default Match;

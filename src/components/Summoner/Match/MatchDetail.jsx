import React from 'react';
import {getChampionIconByChampionName, getItemImageByItemNum, getSummonerSpellImageBySpellName} from 'services/Image';
import {getSpellNameBySpellCode} from 'services/Spell';
import ItemImageComponent from 'components/Summoner/Match/ItemImageComponent';
import PerkIcon from 'components/Summoner/Match/PerkIcon';
import {getKda, getPerKillingMinion} from 'utils/MatchUtils';

const MatchDetail = ({playerData, team, teamInfo, gameInfo}) => {
	const teamColor = team.teamId === 100 ? '레드팀' : '블루팀';
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
							<p className={'grade'}>{getKda({playerData: member})}:1</p>
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
							<p>분당 {getPerKillingMinion({playerData: member, gameInfo})}</p>
						</div>
					</th>
					<th colSpan={'3'}>
						{member.puuid &&
							<div className={'itemWrapper'}>
								{[0, 1, 2, 3, 4, 5].map((itemNum) => {
									return <ItemImageComponent key={itemNum} data={member} itemNum={itemNum} />;
								})}
								<img
									className={'ward'}
									src={getItemImageByItemNum(member.item6)} />
							</div>
						}
					
					</th>
				</tr>;
			})
		}
		</tbody>
	</table>;
};

export default MatchDetail;

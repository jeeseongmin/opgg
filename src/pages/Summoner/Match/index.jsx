import React, {useEffect, useState} from 'react';
import {getMatchById} from 'services/Match';
import {getChampionIconByChampionName, getSummonerSpellImageBySpellName} from 'services/Image';

const Match = ({matchId}) => {
	const [matchInfo, setMatchInfo] = useState([]);
	
	useEffect(() => {
		getMatchInfo();
	}, [matchId]);
	
	const getMatchInfo = async () => {
		const {data} = await getMatchById(matchId);
	};
	
	const LeftBorder = () => {
		return <div className={'leftBorder'}></div>;
	};
	
	const onError = ({currentTarget}) => {
		currentTarget.onerror = null;
		currentTarget.src = `/images/championImages/${'ziggs'}_0.jpg`;
	};
	
	return (
		<section className={'matchComponent'}>
			<LeftBorder />
			<div className={'matchInfo'}>
				<div>
					<p className={'rankType'}><b>랭크</b></p>
					<p>2일 전</p>
				</div>
				<div className={'hr'}></div>
				<div>
					<p><b>승리</b></p>
					<p>21분 36초</p>
				</div>
			</div>
			<div className={'championInfo'}>
				<div>
					<div className={'basicInfo'}>
						<div className={'championImageWrapper'}>
							<img
								className={'championImage'}
								src={getChampionIconByChampionName('Ziggs')}
								onError={onError}
							/>
							<div className={'level'}>11</div>
						</div>
						<div className={'spellWrapper'}>
							<img
								src={getSummonerSpellImageBySpellName('SummonerTeleport')}
							/>
							<img
								src={getSummonerSpellImageBySpellName('SummonerFlash')}
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
							<p><b>2 / <span>9</span> / 6</b></p>
							<p className={'grade'}>0.89:1 평점</p>
						</div>
					</div>
					<div className={'detailInfo'}>
						<p className={'killContribution'}>킬관여 57%</p>
						<p>제어 와드 5</p>
						<p>CS 140 (6.5)</p>
						<p>Gold 3</p>
					</div>
				</div>
				<div>
					<div className={'itemInfo'}>
						<img
							src={'https://opgg-static.akamaized.net/meta/images/lol/item/2420.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
						<img
							src={'https://opgg-static.akamaized.net/meta/images/lol/item/3020.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
						<img
							src={'https://opgg-static.akamaized.net/meta/images/lol/item/3070.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
						<img
							src={'https://opgg-static.akamaized.net/meta/images/lol/item/2055.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
						<img
							src={'https://opgg-static.akamaized.net/meta/images/lol/item/3191.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
						<img
							src={'https://opgg-static.akamaized.net/meta/images/lol/item/6653.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
						<img
							className={'ward'}
							src={'https://opgg-static.akamaized.net/meta/images/lol/item/3363.png?image=q_auto,f_webp,w_64,h_64&v=1702977255104'} />
					</div>
					<div className={'contribution'}>8th</div>
				</div>
			</div>
			<div className={'teamInfo'}>Team Member</div>
			<div className={'toggleBtn'}></div>
		</section>
	
	);
};

export default Match;

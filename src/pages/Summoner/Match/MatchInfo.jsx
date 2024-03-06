import React, {useState} from 'react';
import CircleChart from 'components/Chart/CircleChart';
import ChampionImage from 'components/Image/ChampionRoundImage';
import {getColorClass} from 'utils/CommonUtils';

const MatchInfo = () => {
	const [championInfo, setChampionInfo] = useState([{
		championId: 'Hwei',
		win: 3,
		lose: 1,
		percentOfWinning: 75,
		grade: 7.5,
	}, {
		championId: 'Taliyah',
		win: 1,
		lose: 2,
		percentOfWinning: 33,
		grade: 2.18,
	}, {
		championId: 'KSante',
		win: 2,
		lose: 2,
		percentOfWinning: 50,
		grade: 6.5,
	}]);
	
	const [positionInfo, setPositionInfo] = useState({
		top: {
			'value':
				15, 'imageUrl':
				'https://s-lol-web.op.gg/images/icon/icon-position-top.svg?v=1708681571653',
		},
		jg: {
			'value':
				0, 'imageUrl':
				'https://s-lol-web.op.gg/images/icon/icon-position-jungle.svg?v=1708681571653',
		},
		mid: {
			'value':
				75, 'imageUrl':
				'https://s-lol-web.op.gg/images/icon/icon-position-mid.svg?v=1708681571653',
		},
		ad: {
			'value':
				0, 'imageUrl':
				'https://s-lol-web.op.gg/images/icon/icon-position-adc.svg?v=1708681571653',
		},
		sup: {
			'value':
				6, 'imageUrl':
				'https://s-lol-web.op.gg/images/icon/icon-position-support.svg?v=1708681571653',
		},
	});
	
	const ChampionHistoryComponent = ({_championInfo}) => {
		return <div className={'championHistoryComponent'}>
			<ChampionImage championId={_championInfo.championId} />
			<div>
				<p className={getColorClass({
					type: 'winningOfPercent',
					point: _championInfo.percentOfWinning,
				})}>{_championInfo.percentOfWinning}%</p>
				<p>({_championInfo.win}승 {_championInfo.lose}패)</p>
				<p className={getColorClass({
					type: 'grade',
					point: _championInfo.grade,
				})}>{_championInfo.grade} 평점</p>
			</div>
		</div>;
	};
	
	const BarChart = ({position}) => {
		return <div className={'barChart'}>
			<div className={'bar'}>
				<div className={'gauge'} style={{height: `${positionInfo[position].value}%`}}></div>
			</div>
			<img src={positionInfo[position].imageUrl} />
		</div>;
	};
	
	return (
		<section className={'matchInfoWrapper'}>
			<div className={'tabs'}>
				<button className={'selected'}>전체</button>
				<button>솔로랭크</button>
				<button>자유랭크</button>
			</div>
			<div className={'matchInfo'}>
				<div>
					<p className={'subTitle'}>20전 14승 6패</p>
					<div className={'matchHistory'}>
						<CircleChart />
						<div className={'killScore'}>
							<p>4.5 / <span>3.0</span> / 5.3</p>
							<p>3.27:1</p>
							<p>킬관여 46%</p>
						</div>
					</div>
				</div>
				<div>
					<p className={'subTitle'}>플레이한 챔피언(최근 20게임)</p>
					<div className={'championHistory'}>
						{
							championInfo.map((_championInfo) => {
								return <ChampionHistoryComponent key={_championInfo.championId} _championInfo={_championInfo} />;
							})
						}
					</div>
				</div>
				<div>
					<p className={'subTitle'}>선호 포지션(랭크)</p>
					<div className={'positionHistory'}>
						<BarChart position={'top'} />
						<BarChart position={'jg'} />
						<BarChart position={'mid'} />
						<BarChart position={'ad'} />
						<BarChart position={'sup'} />
					</div>
				</div>
			</div>
		
		</section>
	);
};

export default MatchInfo;

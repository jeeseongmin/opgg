import React from 'react';
import SummonerPreviewRow from 'components/Home/Search/SummonerPreviewRow';

const SummonerList = ({summonerList}) => {
	return (
		<>
			<div className={'previewHeader'}>
				<p>
					<b>Summoner Profiles</b>
				</p>
			</div>
			<div className={'previewList'}>
				{summonerList.map((summoner, index) => {
					console.log(summoner);
					return <SummonerPreviewRow key={summoner.id} data={summoner} />;
				})}
			</div>
		</>
	);
};

export default SummonerList;

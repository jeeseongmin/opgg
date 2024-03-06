import React from 'react';
import ChampionPreviewRow from 'components/Home/Search/ChampionPreviewRow';
import {getChampionInfo} from 'services/Champion';

const ChampionList = ({championList}) => {
	return (
		<>
			<div className={'previewHeader'}>
				<p>
					<b>Champion Builds</b>
				</p>
			</div>
			<div className={'previewList'}>
				{championList.map((champion, index) => {
					return (
						<ChampionPreviewRow
							key={champion}
							data={getChampionInfo(champion)}
						/>
					);
				})}
			</div>
		</>
	);
};

export default ChampionList;

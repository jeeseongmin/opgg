import React from 'react';
import {ImageService} from 'services/Image';

const ChampionPreviewRow = ({data}) => {
	const {id, name, tags} = data;

	const onError = ({currentTarget}) => {
		currentTarget.onerror = null;
		currentTarget.src = `/images/championImages/${id}_0.jpg`;
	};

	return (
		<div className={'previewRow'}>
			<div className={'profileImageWrapper'}>
				<img
					className={'profileImage'}
					src={ImageService.getChampionImage(id)}
					onError={onError}
				/>
			</div>
			<div className={'profileInfoWrapper'}>
				<p>
					<span className={'gameName'}>{name}</span>
				</p>
				<p>
					{tags.map((tag, index) => (
						<span key={tag}>{tag} </span>
					))}
				</p>
			</div>
		</div>
	);
};

export default ChampionPreviewRow;

import React from 'react';

const ChampionPreviewRow = ({data}) => {
	const {id, name, tags} = data;

	return (
		<div className={'previewRow'}>
			<div className={'profileImageWrapper'}>
				<img
					className={'profileImage'}
					src={`/images/championImages/${id}_0.jpg`}
				/>
			</div>
			<div className={'profileInfoWrapper'}>
				<p>
					<span className={'gameName'}>{name}</span>
				</p>
				<p>
					{tags.map((element, index) => (
						<span key={index}>{element} </span>
					))}
				</p>
			</div>
		</div>
	);
};

export default ChampionPreviewRow;

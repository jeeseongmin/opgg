import React from 'react';

const Matches = ({matchList}) => {
	return (
		<section className={'matchesWrapper'}>
			<div className={'matchList'}>
				{matchList.length > 0 && matchList.map((element, index) => {
					return (
						<div className={'matchComponent'} key={element}>
							{element}
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Matches;

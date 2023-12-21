import React from 'react';
import {Link} from 'react-router-dom';

const RouteMenu = ({dataKey, menuName}) => {
	const path = dataKey.toLowerCase();

	return (
		<li className={'routeMenu'}>
			<Link to={`/${path === 'home' ? '' : path}`}>
				<div
					data-key={'HOME'}
					className={`routeBtn ${dataKey === 'HOME' ? 'selected' : ''}`}
				>
					{menuName}
				</div>
			</Link>
		</li>
	);
};

export default RouteMenu;

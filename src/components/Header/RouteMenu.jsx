import React from 'react';
import {Link} from 'react-router-dom';
import commonStore from '../../modules/zustand/commonStore';

const RouteMenu = ({dataKey, menuName}) => {
	const path = dataKey.toLowerCase();
	const {selectedMenu, setSelectedMenu} = commonStore((state) => state);
	
	return (
		<li className={'routeMenu'}>
			<Link to={`/${path === 'home' ? '' : path}`}>
				<div
					data-key={dataKey}
					className={`routeBtn ${selectedMenu === dataKey ? 'selected' : ''}`}
				>
					{menuName}
				</div>
			</Link>
		</li>
	);
};

export default RouteMenu;

import React from 'react';
import 'components/Header/Header.scss';
import RouteMenu from 'components/Header/RouteMenu';

const Header = () => {
	// useNavigate
	
	return (
		<header>
			<div className={'headerContents'}>
				<ul className={'routeList'}>
					<RouteMenu dataKey={'HOME'} menuName={'홈'} />
					<RouteMenu dataKey={'CHAMPION'} menuName={'챔피언 분석'} />
				</ul>
			</div>
		</header>
	);
};

export default Header;

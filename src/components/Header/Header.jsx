import React from 'react';
import 'components/Header/Header.scss';
import RouteMenu from 'components/Header/RouteMenu';

const Header = () => {
	// useNavigate
	
	return (
		<div className={'headerWrapper'}>
			<header>
				<ul className={'routeList'}>
					<RouteMenu dataKey={'HOME'} menuName={'홈'} />
					<RouteMenu dataKey={'CHAMPION'} menuName={'챔피언 분석'} />
				</ul>
			</header>
		</div>
	);
};

export default Header;

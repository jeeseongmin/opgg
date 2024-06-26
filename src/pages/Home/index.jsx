import React from 'react';
import 'pages/Home/Home.scss';
import MainLogo from 'components/Home/MainLogo';
import SearchComponent from 'components/Home/Search/SearchComponent';
import useMenu from 'hooks/useMenu';

const Home = () => {
	useMenu({menuName: 'HOME'});
	
	return (
		<main className={'homeWrapper'}>
			<div className={'home'}>
				<MainLogo />
				<SearchComponent />
			</div>
		</main>
	);
};

export default Home;

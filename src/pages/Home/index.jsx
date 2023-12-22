import React from 'react';
import 'pages/Home/Home.scss';
import MainLogo from 'components/Home/MainLogo';
import SearchComponent from 'components/Home/Search/SearchComponent';

const Home = () => {
	return (
		<div className={'homeWrapper'}>
			<div className={'home'}>
				<MainLogo />
				<SearchComponent />
			</div>
		</div>
	);
};

export default Home;

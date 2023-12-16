import React from 'react';
import 'pages/Home/Home.scss';
import MainLogo from 'components/Home/MainLogo';
import SearchComponent from 'components/Home/Search/SearchComponent';

const Index = () => {
	return (
		<div className={'homeWrapper'}>
			<div className={'home'}>
				<MainLogo />
				<SearchComponent />
			</div>
		</div>
	);
};

export default Index;

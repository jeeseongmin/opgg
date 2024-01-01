import React, {useEffect} from 'react';
import 'styles/App.scss';
import 'styles/normalize.scss';
import Header from 'components/Header/Header';
import Banner from 'components/Banner/Banner';
import Home from 'pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Summoner from 'pages/Summoner';
import {CommonService} from './services/Common';
import authStore from 'modules/zustand/authStore';

function App() {
	const {opggAuth, riotAuth, setOpggAuth, setRiotAuth} = authStore(
		(state) => state,
	);

	useEffect(() => {
		checkAPI();
	}, []);

	const checkAPI = async () => {
		const data = await CommonService.checkOpgg('Hide on bush');
		setOpggAuth(data !== 'error' ? true : false);

		const puuid = await CommonService.checkRiot('Hide on bush', 'KR1');
		setRiotAuth(puuid !== 'error' ? true : false);
	};

	return (
		<div className={'app'}>
			<BrowserRouter>
				<Header />
				<Banner />
				<Routes>
					<Route path={'/'} element={<Home />}></Route>
					<Route path={'/summoners/:fullName'} element={<Summoner />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

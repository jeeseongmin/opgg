import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'styles/App.scss';
import 'styles/normalize.scss';
import authStore from 'modules/zustand/authStore';
import Header from 'components/Header/Header';
import Banner from 'components/Banner/Banner';
import Home from 'pages/Home';
import Summoner from 'pages/Summoner';
import {checkOpgg, checkRiot} from 'services/Common';

function App() {
	const {opggAuth, riotAuth, setOpggAuth, setRiotAuth} = authStore(
		(state) => state,
	);
	
	useEffect(() => {
		checkAPI();
	}, []);
	
	const checkAPI = async () => {
		const data = await checkOpgg('Hide on bush');
		setOpggAuth(data !== 'error' ? true : false);
		
		const puuid = await checkRiot('Hide on bush', 'KR1');
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

import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'styles/App.scss';
import 'styles/normalize.scss';
import Header from 'components/Header/Header';
import Banner from 'components/Banner/Banner';
import Home from 'pages/Home';
import Summoner from 'pages/Summoner';

function App() {
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

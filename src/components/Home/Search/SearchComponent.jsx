import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SummonerPreviewRow from 'components/Home/Search/SummonerPreviewRow';
import ChampionPreviewRow from 'components/Home/Search/ChampionPreviewRow';
import {SummonerService} from 'services/Summoner';
import {ChampionService} from 'services/Champion';

const SearchComponent = () => {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	const [summonerList, setSummonerList] = useState([]);
	const [championList, setChampionList] = useState([]);
	const labelRef = useRef(null);

	useEffect(() => {
		if (searchText !== '') {
			getPreviewList();
		} else {
			setSummonerList([]);
			setChampionList([]);
		}
	}, [searchText]);

	const getPreviewList = async () => {
		const {data} = await SummonerService.getSummonersByName(` ${searchText}`);
		setSummonerList(data.slice(0, 4));
		const result = ChampionService.getChampionListByName(searchText);
		setChampionList(result);
	};

	const onChange = (e) => {
		setSearchText(e.target.value);
		if (e.target.value) {
			labelRef.current.style.setProperty('display', 'none');
		} else {
			labelRef.current.style.setProperty('display', 'flex');
		}
	};

	const onKeyPress = (e) => {
		if (e.key === 'Enter' && searchText !== '') {
			searchSummoner();
		}
	};

	const searchSummoner = () => {
		navigate(`/summoners/${searchText}`, {replace: true});
	};

	return (
		<div className={'searchComponentWrapper'}>
			<div>
				<div className={'searchForm'}>
					<div>
						<small className={'label'}>지역</small>
						<div className={'searchRegionContainer'}>
							<label className={'hidden'} htmlFor={'kr'}>
								kr
							</label>
							<select id='kr'>
								<option value='na'>NA</option>
								<option value='euw'>EUW</option>
								<option value='eune'>EUNE</option>
								<option value='oce'>OCE</option>
								<option value='kr'>KR</option>
								<option value='jp'>JP</option>
								<option value='br'>BR</option>
								<option value='las'>LAS</option>
								<option value='lan'>LAN</option>
								<option value='ru'>RU</option>
								<option value='tr'>TR</option>
								<option value='sg'>SG</option>
								<option value='ph'>PH</option>
								<option value='tw'>TW</option>
								<option value='vn'>VN</option>
								<option value='th'>TH</option>
							</select>
						</div>
						<div className={'searchRegionBtnWrapper'}>
							<div>
								<button type={'button'} className={'searchRegionBtn'}>
									<img
										src='https://s-lol-web.op.gg/assets/images/regions/01-icon-icon-kr.svg?v=1700641403304'
										width='24'
										height='24'
										alt=''
									/>
									<span>Korea</span>
								</button>
							</div>
						</div>
					</div>
					<div className={'searchNameWrapper'}>
						<label htmlFor={'searchText'} className={'label'}>
							검색
						</label>
						<input
							id={'searchText'}
							name={'searchText'}
							autoComplete={'off'}
							type={'text'}
							onChange={onChange}
							onKeyPress={onKeyPress}
						/>
						<label
							ref={labelRef}
							htmlFor={'searchText'}
							className={'searchNameLabel customPlaceholder'}
						>
							<span className={'customPlaceholderName'}>플레이어 이름 +</span>
							<span className={'customPlaceholderTag'}>#KR1</span>
						</label>

						{(summonerList.length > 0 || championList.length > 0) && (
							<div className={'previewListWrapper'}>
								{summonerList.length > 0 && (
									<>
										<div className={'previewHeader'}>
											<p>
												<b>Summoner Profiles</b>
											</p>
										</div>
										<div className={'previewList'}>
											{summonerList.map((summoner, index) => {
												console.log(summoner);
												return (
													<SummonerPreviewRow
														key={summoner.id}
														data={summoner}
													/>
												);
											})}
										</div>
									</>
								)}
								{championList.length > 0 && (
									<>
										<div className={'previewHeader'}>
											<p>
												<b>Champion Builds</b>
											</p>
										</div>
										<div className={'previewList'}>
											{championList.map((champion, index) => {
												return (
													<ChampionPreviewRow
														key={champion}
														data={ChampionService.getChampionInfo(champion)}
													/>
												);
											})}
										</div>
									</>
								)}
							</div>
						)}
					</div>
					<button className='ggBtn' onClick={searchSummoner}>
						.GG
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchComponent;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {SummonerService} from 'services/Summoner';
import {ChampionService} from 'services/Champion';
import SummonerList from 'components/Home/Search/SummonerList';
import ChampionList from 'components/Home/Search/ChampionList';

const SearchComponent = () => {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	const [summonerList, setSummonerList] = useState([]);
	const [championList, setChampionList] = useState([]);
	const labelRef = useRef(null);
	
	useEffect(() => {
		getLists();
	}, [searchText]);
	
	const getLists = useCallback(async () => {
		if (searchText) {
			const _summonerList = await SummonerService.getSummonersByName(
				` ${searchText}`,
			);
			setSummonerList(_summonerList.slice(0, 4));
			const _championList = ChampionService.getChampionListByName(searchText);
			setChampionList(_championList);
		} else {
			setSummonerList([]);
			setChampionList([]);
		}
	}, [searchText]);
	
	const onChange = (e) => {
		setSearchText(e.target.value);
		if (e.target.value) {
			labelRef.current.style.setProperty('display', 'none');
		} else {
			labelRef.current.style.setProperty('display', 'flex');
		}
	};
	
	const onKeyPress = (e) => {
		const enabledSearch =
			e.key === 'Enter' && searchText && summonerList.length > 0;
		if (enabledSearch) {
			searchSummoner();
		}
	};
	
	const searchSummoner = () => {
		const {game_name, tagline} = summonerList[0];
		navigate(`/summoners/${game_name}-${tagline}`, {replace: true});
	};
	
	const showDropdown = useCallback(() => {
		return summonerList.length > 0 || championList.length > 0;
	}, [summonerList, championList]);
	
	return (
		<section className={'searchComponentWrapper'}>
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
						{showDropdown() && (
							<div className={'previewListWrapper'}>
								{summonerList.length > 0 && (
									<SummonerList summonerList={summonerList} />
								)}
								{championList.length > 0 && (
									<ChampionList championList={championList} />
								)}
							</div>
						)}
					</div>
					<button className='ggBtn' onClick={searchSummoner}>
						.GG
					</button>
				</div>
			</div>
		</section>
	);
};

export default SearchComponent;

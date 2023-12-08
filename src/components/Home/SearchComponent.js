import React from 'react';

const SearchComponent = () => {
  return (
    <div className={'searchComponentWrapper'}>
      <div>
        <form className={'searchForm'}>
          <div>
            <small className={'label'}>지역</small>
            <div className={'searchRegionContainer'}>
              <label class={'hidden'} for={'kr'}>kr</label>
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
                <button type={'button'} class={'searchRegionBtn'}>
                  <img src='https://s-lol-web.op.gg/assets/images/regions/01-icon-icon-kr.svg?v=1700641403304'
                       width='24' height='24' alt='' />
                  <span>Korea</span>
                </button>
              </div>
            </div>
          </div>
          <div className={'searchNameWrapper'}>
            <label htmlFor={'searchHome'} className={'label'}>검색</label>
            <input id={'searchHome'} name={'search'} autoComplete='off' type={'text'} disabled />
            <label for={'searchHome'} className={'searchNameLabel custom-placeholder'}>
              <span className={'custom-placeholder-name'}>플레이어 이름 +</span>
              <span className={'custom-placeholder-tag'}>#KR1</span>
            </label>
          </div>
          <button className='gg-btn' type={'submit'}>.GG</button>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;

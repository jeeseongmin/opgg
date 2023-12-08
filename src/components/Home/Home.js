import React from 'react';
import 'components/Home/Home.scss';
import MainLogo from 'components/Home/MainLogo';
import SearchComponent from 'components/Home/SearchComponent';

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

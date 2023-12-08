import 'App.scss';
import 'normalize.scss';
import Header from 'components/Header/Header';
import Banner from 'components/Banner/Banner';
import Home from 'components/Home/Home';

function App() {
  
  return (
    <div className={'app'}>
      <Header />
      <Banner />
      <Home />
    </div>
  );
}

export default App;

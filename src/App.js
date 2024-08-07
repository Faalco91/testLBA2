import './App.css';
import Banner from './components/banner/banner.js';
import Cards from './components/cards/cards.js'

function App() {
  return (
    <div className='body'>
      <Banner />
      <main className='main'>
        <Cards />
      </main>
    </div>
  );
}

export default App;

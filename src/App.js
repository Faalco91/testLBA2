import './App.css';
import Banner from './components/banner/banner.js';
import Cards from './components/cards/cards.js'

function App() {
  return (
    <>
      <Banner />
      <main className='main'>
        <Cards />
      </main>
    </>
  );
}

export default App;

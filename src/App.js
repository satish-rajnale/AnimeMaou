import {useState, useEffect} from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
function App() {

  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState('');
  const [recents, setRecents] = useState([]);


  const getAnime = async() => {
    const temp = await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
                          .then(res => res.json())

          setTopAnime(temp.top.slice(0,5));
  }

  // const getRecents = async() => {
  //   const temp = await fetch()
  //                         .then(res => res.json())

  //       setRecents(temp.anime.slice(0,5));
  // }
  // console.log(recents)

  useEffect(() => {
      getAnime();
  }, [])
  
  const handleSearch = (e) => {
    e.preventDefault();
    FetchAnime(search);
  }

  const FetchAnime = async (query) => {
    const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
                  .then(res => res.json());
    
          setAnimeList(temp.results);
  }

  return (
    <div className="App">
      <Header/>
      <div className="content-wrap">
        <Sidebar topAnime={topAnime}/>
        <MainContent
            // getRecents={getRecents}
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
            animeList={animeList}/>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Pagination from "./components/Pagination"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import SingleAnime from "./components/SingleAnime";
import AnimeData from "./context/AnimeDataContext";
function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
// const AnimeData = createContext({
//   topAnime: topAnime
// });
  const getAnime = async () => {
      const temp = await fetch(
        "https://api.jikan.moe/v3/top/anime/1/bypopularity"
      ).then((res) => res.json());
  
      setTopAnime(temp.top.slice(0, 10));
    };
    useEffect(() => {
      getAnime();
    }, []);
  
    const handleSearch = (e) => {
      e.preventDefault();
      FetchAnime(search);
    };
  
    const FetchAnime = async (query) => {
      const temp = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=popularity&sort=desc`
      ).then((res) => res.json());
      //  // const episodes = await fetch(`https://api.jikan.moe/v3/anime/1/episodes/2`)
      //   .then(res => res.json());
      setAnimeList(temp.results);
    };

    const props = {
      handleSearch: handleSearch,
      search:search,
      setSearch:setSearch,
      animeList:animeList,
      topAnime:topAnime
    }
  return (
    <Router>
      <AnimeData.Provider value={props}>
      <Switch>
      {/* <Route exact path="/pages">
          <Pagination
            data={animeList}
            RenderComponent={<MainContent/>}
            title="Posts"
            pageLimit={5}
            dataLimit={10}
          />
        </Route> */}
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home props ={props}/>
        </Route>
        <Route path="/:mal_id">
          <SingleAnime />
        </Route>
       
      </Switch>
      </AnimeData.Provider>
    </Router>
  );
}

export default App;

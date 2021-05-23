import { useState, useEffect, createContext } from "react";

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
    console.log(topAnime)
  
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
      <AnimeData.Provider value={topAnime}>
      <Switch>
        <Route path="/about">
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

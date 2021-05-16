import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/About"
import Home from "./components/Home";


function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  // const [recents, setRecents] = useState([]);

  const getAnime = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v3/top/anime/1/bypopularity"
    ).then((res) => res.json());

    setTopAnime(temp.top.slice(0, 10));
  };

  // const getRecents = async() => {
  //   const temp = await fetch()
  //                         .then(res => res.json())

  //       setRecents(temp.anime.slice(0,5));
  // }
  // console.log(recents)

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

  return (
    <Router>
   <Home/>
      <Link to="about">About</Link>
      
    
       
         <Switch>
          <Route path="/about">
            <About />
          </Route>
        
        </Switch>
       
     

    </Router>
  );
}

export default App;

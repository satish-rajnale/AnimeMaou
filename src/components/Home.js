import React from 'react'
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
function Home() {
    const [animeList, setAnimeList] = useState([]);
    const [topAnime, setTopAnime] = useState([]);
    const [search, setSearch] = useState("");

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
    return (
        <div className="App">
        <Header />
        <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          // getRecents={getRecents}
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          animeList={animeList}
          topAnime={topAnime}
        />
        </div>
        </div>
    )
}

export default Home

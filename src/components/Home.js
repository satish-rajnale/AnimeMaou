import React from 'react'
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
function Home() {
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

import React from "react";

import TopAnimeList from "./TopAnimeList";

function Sidebar({ topAnime }) {
  // let { path, url } = useRouteMatch();
  
  return (
    <aside>
      <nav>
        <h3>Top Anime</h3>
        {topAnime.map((anime) => (
              
              <TopAnimeList anime={anime} />
            
          ))}

      </nav>
      <nav>
        <div className="top-list">
          <div className="top-text">
            <a href="/pages" target="_blank" key="more" rel="noreferrer">
              More...
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

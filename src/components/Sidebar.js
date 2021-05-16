import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import SingleAnime from "./SingleAnime";

function Sidebar({ topAnime }) {
  let { path, url } = useRouteMatch();
  return (
    <aside>
      <nav>
        <h3>Top Anime</h3>
      
          {topAnime.map((anime) => (
            <>
             
                <div key={anime.mal_id} className="top-list">
                  <img src={anime.image_url} alt={anime.title} />
                  <div className="top-text">
                    <a href={`http://localhost:3000/${anime.title}`} target="_blank" rel="noreferrer">
                      {anime.title}
                    </a>
                    <p>rating: {anime.score}</p>
                  </div>
                </div>
            
               
             
            </>
          ))}
        
      </nav>
      <nav>
        <div className="top-list">
          <div className="top-text">
            <a href="#" target="_blank" key="more" rel="noreferrer">
              More...
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

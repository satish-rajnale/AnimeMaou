import React from 'react'
import {
  
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
function TopAnimeList({anime}) {


    return (
      
      <div key={anime.mal_id} className="top-list">
       
      <img src={anime.image_url} alt={anime.title} />
      <div className="top-text">
        <Link to={`/${anime.mal_id}`} target="_blank" rel="noreferrer">
          {anime.title}
        </Link>
        <p>rating: {anime.score}</p>
      </div>
      
    </div>
    )
}

export default TopAnimeList

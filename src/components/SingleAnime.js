import React from 'react'

function SingleAnime({anime}) {
    return (
        <div  key={anime.mal_id} className="top-list">
        <img  src={anime.image_url} alt={anime.title} />
        <div className="top-text">
        <a
          href={anime.url}
          target="_blank"
         
          rel="noreferrer"
        >
          {anime.title}
        </a>
        <p >rating: {anime.score}</p>
        </div>
      </div>
    )
}

export default SingleAnime

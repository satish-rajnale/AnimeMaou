import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AnimeData from "../context/AnimeDataContext";
import "../assets/scss/singleAnime.css"
function SingleAnime() {
  const topAnime = useContext(AnimeData);
  const { mal_id } = useParams();

  const data = topAnime.filter((obj) => obj.mal_id == mal_id);

  console.log(data);
  return <div>{topAnime.length == 0 ? <div>Loading...</div> : 
    
      data.map(anime => (
        <article className="singleAnime">
           <h3 style={{textOverflow:"ellipsis"}}>{anime.title}</h3>
               <figure>
                   <img 
                        src={anime.image_url}
                        alt={anime.title}/>
               </figure>
              
               <h3 style={{textOverflow:"ellipsis"}}>{anime.end_date}</h3>
               <h3 style={{textOverflow:"ellipsis"}}>{anime.episodes}</h3>
               <h3 style={{textOverflow:"ellipsis"}}>{anime.members}</h3>
               <h3 style={{textOverflow:"ellipsis"}}>{anime.rank}</h3>
               <h3 style={{textOverflow:"ellipsis"}}>{anime.score}</h3>
               <h3 style={{textOverflow:"ellipsis"}}>{anime.start_date}</h3>
               <h3 style={{textOverflow:"ellipsis"}}>{anime.type}</h3>
               <h3 style={{textOverflow:"ellipsis"}}>{anime.url}</h3>
        
       </article>
      )
    )}</div>;
}

export default SingleAnime;

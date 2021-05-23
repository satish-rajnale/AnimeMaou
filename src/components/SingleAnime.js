import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AnimeData from "../context/AnimeDataContext";
function SingleAnime() {
  const topAnime = useContext(AnimeData);
  const { mal_id } = useParams();

  const data = topAnime.filter((obj) => obj.mal_id == mal_id)[0];

  console.log(data);
  return <div>{topAnime.length == 0 ? <div>Loading...</div> : data.title}</div>;
}

export default SingleAnime;

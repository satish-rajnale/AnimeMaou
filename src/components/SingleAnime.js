import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimeData from "../context/AnimeDataContext";
import "../assets/scss/singleAnime.css";
import Header from "./Header";
function SingleAnime() {
  const { topAnime } = useContext(AnimeData);
  const { mal_id } = useParams();
  const [pictures, setpictures] = useState([]);
  const data = topAnime.filter((obj) => obj.mal_id === parseInt(mal_id));
  const [imageSrc, setimageSrc] = useState([]);
  useEffect(() => {
    getAnime();
  }, []);


  const getAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/anime/${mal_id}/pictures`
    ).then((res) => res.json());

    setpictures(temp.pictures);
    console.log("fetched");
  };
  console.log("images", imageSrc);

  // console.log(pictures)
  
  return (
    <div>
      {topAnime.length === 0 ? (
        <div>Loading...</div>
      ) : (
        data.map((anime) => (
          <>
            <div className="singlePage">
              <Header />

              <article className="singleAnime">
                <figure>
                  <img
                    className="singleAnimeimage"
                    src={anime.image_url}
                    alt={anime.title}
                  />
                </figure>
                <div className="dataList">
                  <h3 style={{ textOverflow: "ellipsis" }}>
                    <label>Title:</label> {anime.title}
                  </h3>
                  <h3 style={{ textOverflow: "ellipsis" }}>
                    <label>Rating :</label> {anime.score}
                  </h3>

                  <p style={{ textOverflow: "ellipsis" }}>
                    <label>Episodes : </label>
                    {anime.episodes}
                  </p>
                  <p style={{ textOverflow: "ellipsis" }}>
                    <label>Members :</label> {anime.members}
                  </p>
                  <span style={{ textOverflow: "ellipsis" }}>
                    <label>Rank :</label> {anime.rank}
                  </span>
                  <p style={{ textOverflow: "ellipsis" }}>
                    <label>Started on : </label>
                    {anime.start_date} &nbsp; <label>Ended on :</label>{" "}
                    {anime.end_date}
                  </p>
                  <p style={{ textOverflow: "ellipsis" }}>
                    <label>Type:</label> {anime.type}
                  </p>
                </div>
              </article>
              <div className="linktoMyAnimeList">
                {" "}
                Check the full description on{" "}
                <a href={anime.url}>MyAnimeList</a>.
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
}

export default SingleAnime;

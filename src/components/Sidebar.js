function Sidebar({ topAnime }) {
  return (
    <aside>
      <nav>
        <h3>Top Anime</h3>
        {topAnime.map((anime) => (
          <div  className="top-list">
            <img key={anime.mal_id} src={anime.image_url} />
            <div className="top-text">
            <a
              href={anime.url}
              target="_blank"
              key={anime.mal_id}
              rel="noreferrer"
            >
              {anime.title}
            </a>
            <p key={anime.mal_id}>rating: {anime.score}</p>
            </div>
          </div>
        ))}
      </nav>
      <nav>
        {" "}
        <a href="#" target="_blank" key="more" rel="noreferrer">
          More...
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;

function Sidebar({ topAnime }) {
  return (
    <aside>
      <nav>
    
      <h3>Top Anime</h3>
       
        {topAnime.map((anime) => (
          <div key={anime.mal_id} className="top-list">
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
        ))}
      </nav>
      <nav>
      <div  className="top-list">
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

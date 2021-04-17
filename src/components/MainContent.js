import AnimeCard from './AnimeCard';

function MainContent(props) {
    return (
        <main>
            {/* <button onClick={props.getRecents()}>Recents</button> */}
            <div className="main-head">
                <form 
                    className="search-box"
                    onSubmit={props.handleSearch}>
                    <input
                        type="search"
                        placeholder="Search for an anime..."
                        required
                        appearance="none"
                        value={props.search}
                        onChange={(e)=>props.setSearch(e.target.value)}/>
                </form>
            </div>
            <div className="anime-list">
                {  props.animeList.length!==0?props.animeList.map( anime => (
                   <AnimeCard
                        anime={anime}
                        key={anime.mal_id}/>
                )) : props.topAnime.map( anime => (
                    <AnimeCard
                        anime={anime}
                        key={anime.mal_id}/>
                ))
                }
            </div>
        </main>
    )
}

export default MainContent

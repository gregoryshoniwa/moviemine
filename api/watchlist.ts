
const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGEyNTBlMzFiYzQxZDY3ODVjNDM3NmQzN2ViNzYzYyIsInN1YiI6IjYxZjFhMmYwMDI4NDIwMDAxYjczYThlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lSIrT7rStH8pGOPwyfuMztNGtioBZOb5aVZjQOd_lP4'
}
export const addMovieToWatchList = async (movieId: any) => {
    
    const url = 'https://api.themoviedb.org/3/account/11829029/watchlist';
    const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({media_type: 'movie', media_id: movieId, watchlist: true})
    };

    const response = await fetch(url,options)
    if(!response.ok) throw new Error('Something went wrong, Failed to add movie to watchlist');
    const data = await response.json();
    return data;
}

export const fetchWatchListMovies = async () => {
    
const url = 'https://api.themoviedb.org/3/account/11829029/watchlist/movies?sort_by=created_at.desc';
const options = {
  method: 'GET',
  headers
};

const reponse = await fetch(url, options);
if(!reponse.ok) throw new Error('Something went wrong, Failed to get watchlist');
const data = await reponse.json();
return data.results;
}
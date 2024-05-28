export const fetchTopRatedMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated';
    const options = {
    method: 'GET',
    headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGEyNTBlMzFiYzQxZDY3ODVjNDM3NmQzN2ViNzYzYyIsInN1YiI6IjYxZjFhMmYwMDI4NDIwMDAxYjczYThlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lSIrT7rStH8pGOPwyfuMztNGtioBZOb5aVZjQOd_lP4'
        }
    };

    
        const reponse = await fetch(url, options);
        if(!reponse.ok) throw new Error('Something went wrong, Failed to get movies');
        const data = await reponse.json();
        return data.results;
}


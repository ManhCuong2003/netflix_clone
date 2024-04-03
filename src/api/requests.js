const requests = {
  fetchHeroMovies: `/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`,
  fetchTrending: `/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  fetchAnimation: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=16`,
  fetchActionMovies: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
  fetchDetailMovie: `/movie/`
}

export default requests

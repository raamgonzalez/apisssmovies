import axios from 'axios'

const API_KEY = '56403e3a33d840be24c1e87a8ce232b5'
const API_URL = 'https://api.themoviedb.org/3'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

export const searchMovies = async ({ search }) => {
  if (search === '') return null
  const type = search ? 'search' : 'discover'

  const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
    params: {
      api_key: API_KEY,
      query: search
    }
  })

  const movies = results

  return movies?.map(movie => ({
    id: movie.id,
    title: movie.original_title,
    poster: URL_IMAGE + (movie.poster_path ? movie.poster_path : null),
    release: movie.release_date,
    tagline: movie.tagline
  }))
}

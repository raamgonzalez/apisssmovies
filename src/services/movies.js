const API_KEY = 'k_jwef6v4x'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${API_KEY}/${search}`)
    const json = await response.json()

    const movies = json.results

    return movies?.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.image,
      description: movie.description
    }))
  } catch (error) {
    throw new Error('Error en la búsqueda de películas')
  }
}

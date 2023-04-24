import responseMovies from '../mocks/with-results.json'

export function useMovies () {
  const movies = responseMovies.results

  const mappedMovies = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    poster: movie.image,
    description: movie.description
  }))

  return { movies: mappedMovies }
}

/*
  {movies.map(movies => (
        <li key={movies.id}>
          <h2>{movies.title}</h2>
          <img className='max-w-xs w-70' src={movies.image} alt={movies.title} />
          <p>{movies.description}</p>
        </li>
      ))}
    </ul>
  ) */

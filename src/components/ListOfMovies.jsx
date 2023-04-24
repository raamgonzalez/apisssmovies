export default function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(movies => (
        <li key={movies.id}>
          <h2>{movies.title}</h2>
          <img className='max-w-xs w-70' src={movies.poster} alt={movies.title} />
          <p>{movies.description}</p>
        </li>
      ))}
    </ul>
  )
}

function noMoviesResults () {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl font-bold'>No hay resultados</h1>
      <p className='text-xl'>Intente con otra búsqueda</p>
    </div>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : noMoviesResults()
  )
}

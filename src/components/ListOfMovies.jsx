
export default function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(movies => (
        <li key={movies.id} className='grid grid-rows-1'>
          <h2 className='text-2xl mb-2 inline-block w-50'>{movies.title}</h2>
          <p className='text-md'>{movies.tagline}</p>
          <img className={movies.poster ? 'imgposter' : 'imgposter  object-cover'} src={movies.poster ? movies.poster : './notimage.webp'} alt={movies.title} />
          <p className='text-md mt-4'>Estreno - {movies.release.slice(0, 4)}</p>
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

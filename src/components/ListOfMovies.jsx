export default function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(movies => (
        <li key={movies.id} className='px-5'>
          <h2 className='text-2xl mb-2 inline-block w-50'>{movies.title}</h2>
          <p className='text-md'>{movies.description.slice(0, 4)}</p>
          <img className={movies.poster ? 'imgposter' : 'imgposter  object-cover'} src={movies.poster ? movies.poster : './notimage.webp'} alt={movies.title} />
          <p className='text-md mt-4'>{movies.description.slice(4, -1)}</p>
        </li>
      ))}
      {/* shadow-slate-700 shadow-lg */}
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

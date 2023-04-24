import { useEffect, useState } from 'react'
import { Movies } from './components/ListOfMovies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (search === '') {
      setError('No se puede realizar una busqueda vacia')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('La busqueda no puede ser un numero')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

export default function App () {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }

  const handleChange = (event) => {
    // const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return
    updateSearch(event.target.value)
  }

  return (
    <>
      <header className='w-full font-mono'>
        <h1 className='grid place-items-center'>sssmovies</h1>
        <form className='flex flex-row mx-auto w-96' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type='text' placeholder='Avengers, Avatar, Evil Dead' />
          <button>Buscar</button>
        </form>
        {error && <p className='text-red-500 text-center'>{error}</p>}
      </header>

      <main className='w-full text-center'>
        <Movies movies={movies} />
      </main>
    </>
  )
}

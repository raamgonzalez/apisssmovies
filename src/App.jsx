import { useEffect, useState, useRef, useCallback } from 'react'
import { Movies } from './components/ListOfMovies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
import './App.css'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
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
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 500), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header className='w-full'>
        <h1 className='grid place-items-center text-6xl mb-10 mt-10'>sssmovies</h1>
        <form className='flex flex-row mx-auto w-96 text-slate-900' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type='text' placeholder='Avengers, Avatar, Evil Dead' />
          <button className='search__button hover:shadow-zinc-900 hover:scale-105'>Buscar</button>
        </form>
        <form className='flex flex-row mx-auto w-96 text-slate-900'>
          <label className='mr-2 mt-2'>Ordenar por título</label>
          <input className='mr-5 mt-2' type='checkbox' onChange={handleSort} checked={sort} />
        </form>
        {error && <p className='text-red-500 text-center'>{error}</p>}
      </header>

      <main className='w-full text-center mt-10 p-0 '>
        {
          loading ? <p className='text-2xl'>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

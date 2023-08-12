import { useState, useCallback, useEffect } from 'react'
import { Movies } from './components/ListOfMovies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
import './App.css'
import useSearch from './hooks/useSearch'
import Spinner from './components/Spinner'

export default function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 500), [])

  useEffect(() => getMovies({ searchKey: 'avengers' }), [])

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
        <h1 className='grid place-items-center text-6xl mb-10 mt-10'>movMovies</h1>
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

      <main className='w-full grid place-items-center text-center mt-10 p-0 '>
        {
          loading ? <Spinner /> : <Movies movies={movies} />
        }

      </main>
    </div>
  )
}

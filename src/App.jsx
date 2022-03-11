import { useState } from 'react'
import logo from './assets/vinilo2.png'
import './App.scss'
import {getFromApi} from './services/api.service'
import List from './components/List/List'
import ArtistBlock from './components/ArtistBlock/ArtistBlock'

function App() {
  
  const [ queryResponse, setResponse ] = useState(null)
  const [ queryText, setQuery ] = useState("")

  const callApi = async () => {
    setResponse(null)
    const res = await getFromApi(`database/search?q=${queryText}&type=artist`,true)
    setResponse(res.results)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    callApi()
  }

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="appLogo" alt="logo" />
        <form onSubmit={e=>handleSubmit(e)}>
          <input type="text" onChange={e=>setQuery(e.target.value)} />
        </form>

      </div>
      {
          queryResponse?.length == 0 ? 
            <h5>No matches found</h5>

        : 
        
          queryResponse?.length > 0 && <ArtistBlock result={queryResponse[0]}/>
        
      }
    </div>
  )
}

export default App

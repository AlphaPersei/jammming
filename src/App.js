//import logo from './logo.svg';
//import './App.css';
import React, {useState} from 'react';
//import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
  const[searchResults, setSearchResults]= useState([
    {
      id: 1,
      name: 'Blinding Lights',
      artist:'The Weekend',
      album: 'After Hours'
    },
     {
      id: 2,
      name: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia'
    },
    {
      id: 3,
      name: 'Peaches',
      artist: 'Justin Bieber',
      album: 'Justice'
    }

  ]);
  return (
    <div className="App">
      <h1>Jammming</h1>
      <div classNmae="App-content">
        <SearchResults searchResults={searchResults} />
        <Playlist/>
        </div>
      
      
    </div>
  );
}

export default App;

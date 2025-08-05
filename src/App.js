//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import SearchBar from './SearchBar';
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

const [playlistName, setPlaylistName] = useState('My Playlist');

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 4,
      name: 'Don’t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia'
    },
    {
      id: 5,
      name: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours'
    }
  ]);


  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <div className="App-content">
        <SearchResults searchResults={searchResults} />
        <Playlist

        playlistName={playlistName}
        playlistTracks={playlistTracks}
        />
        </div>
      
      
    </div>
  );
}

export default App;

//import logo from './logo.svg';
import './App.css';

import React, {useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';
import { useEffect } from 'react';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) return;
    setPlaylistTracks(prev => [...prev, track]);
  }

  function removeTrack(track) {
    setPlaylistTracks(prev => prev.filter(t => t.id !== track.id));
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
  const trackUris = playlistTracks.map(track => track.uri);
  Spotify.savePlaylist(playlistName, trackUris).then(() => {
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
    //Ensure the savePlaylist method is passed to your Playlist component and hooked to the "Save To Spotify" button.
    });
  }

  function search(term) {
    Spotify.search(term).then(results => {
      setSearchResults(results);
    });
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

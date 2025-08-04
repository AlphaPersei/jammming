import logo from './logo.svg';
import './App.css';
import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
  return (
    <div className="App">
      <h1>Jammming</h1>
      <div classNmae="App-content">
        <SearchResults/>
        <Playlist/>
        </div>
      
      
    </div>
  );
}

export default App;

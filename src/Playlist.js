import React from 'react';
import Tracklist from './Tracklist';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange }) {
    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    }
  return (
    <div className="Playlist">
       <input 
       value={playlistName}
        onChange={handleNameChange}
        
        />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
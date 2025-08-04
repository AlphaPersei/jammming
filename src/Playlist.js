import React from 'react';
import Tracklist from './Tracklist';

function Playlist() {
  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" />
      <Tracklist />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
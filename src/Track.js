import React from 'react';

function Track({ track, onAdd, isRemoval }) {
    const handleAdd = () => {
    onAdd(track);
  };
  return (
    <div className="Track">
      <div className="Track-information">
         <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {!isRemoval && (
      <button className="Track-action" onClick={handleAdd}>+allover</button>
      )}
    </div>
  
  );
}

export default Track;
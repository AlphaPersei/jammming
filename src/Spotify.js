// Spotify.js

const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const redirectUri = 'http://localhost:3000/'; // Make sure this matches your Spotify app settings
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresMatch[1]);

      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const token = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(json => {
        if (!json.tracks) return [];

        return json.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) return;

    const token = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers })
      .then(response => response.json())
      .then(json => {
        userId = json.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ name })
        });
      })
      .then(response => response.json())
      .then(json => {
        const playlistId = json.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ uris: trackURIs })
        });
      });
  }
};

export default Spotify;
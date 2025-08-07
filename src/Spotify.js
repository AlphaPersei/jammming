// Spotify.js

const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const redirectUri = 'http://localhost:3000/'; // Make sure this matches your Spotify app settings
let accessToken;


const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    const token = Spotify.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) return [];

    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) return;

    const token = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    try {
      // Step 1: Get User ID
      const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
      const userData = await userResponse.json();
      const userId = userData.id;

      // Step 2: Create Playlist
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: playlistName,
          description: 'Created with Jammming!',
          public: true
        })
      });

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      // Step 3: Add Tracks to Playlist
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ uris: trackUris })
      });

    } catch (error) {
      console.error("Error saving playlist to Spotify:", error);
    }
  }
};

export default Spotify;
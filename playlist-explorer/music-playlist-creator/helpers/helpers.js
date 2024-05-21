function loadSongs(songsContainer, songs) {
  songs.forEach(song => {
    const songElement = createSongElement(song);
    songsContainer.appendChild(songElement);
  });
}

function createSongElement(song) {
  const songElement = document.createElement('div');
  songElement.classList.add('song');
  songElement.innerHTML = `
    <div class="song-details">
      <img src="${song.cover_art}" alt="Cover Art" />
      <div class="song-identifiers">
        <p>${song.title}</p>
        <p>${song.artist}</p>
        <p>${song.album}</p>
      </div>
    </div>
    <p class="song-duration">${song.duration}</p>
  `;
  return songElement;
}

function likePlaylist(playlistId, playlists) {
  const playlist = playlists.find(playlist => playlist.playlistID === playlistId);
  if (playlist) {
    playlist.likeCount += 1;
  }
}

function shuffleSongs(element, songs) {
  shuffleArray(songs);
  element.innerHTML = '';
  loadSongs(element, songs);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { loadSongs, likePlaylist, shuffleArray as shuffle, shuffleSongs };

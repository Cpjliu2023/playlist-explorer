import { loadSongs, shuffle } from "./helpers/helpers.js";

const featuredContainer = document.querySelector('.featured-playlist');
const { playlists } = data;

function createPlaylistCard(playlist) {
  const playlistCard = document.createElement('div');
  playlistCard.classList.add('featured-playlist-card');

  const playlistImg = document.createElement('img');
  playlistImg.src = playlist.playlist_art;

  const playlistName = document.createElement('p');
  playlistName.textContent = playlist.playlist_name;

  playlistCard.append(playlistImg, playlistName);
  return playlistCard;
}

function loadFeaturedPlaylist(playlist) {
  const playlistCard = createPlaylistCard(playlist);
  featuredContainer.appendChild(playlistCard);

  const songsContainer = document.createElement('div');
  songsContainer.classList.add('songs-container');
  loadSongs(songsContainer, playlist.songs);
  featuredContainer.appendChild(songsContainer);
}

function onLoad() {
  shuffle(playlists);
  loadFeaturedPlaylist(playlists[0]);
}

onLoad();

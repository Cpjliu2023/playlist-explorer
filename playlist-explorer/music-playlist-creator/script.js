import { loadSongs, likePlaylist, shuffleSongs } from "./helpers/helpers.js";

const playlistContainer = document.querySelector('.playlist-cards');
const { playlists } = data;

function loadPlaylists() {
  playlists.forEach(playlist => {
    const playlistCard = createPlaylistCard(playlist);
    playlistContainer.appendChild(playlistCard);
  });
}

function createPlaylistCard(playlist) {
  const playlistCard = document.createElement('div');
  playlistCard.classList.add('playlist-card');

  const playlistImg = document.createElement('img');
  playlistImg.src = playlist.playlist_art;

  const playlistName = document.createElement('p');
  playlistName.textContent = playlist.playlist_name;

  const playlistLikes = document.createElement('span');
  playlistLikes.textContent = playlist.likeCount;

  const playlistHeartIcon = document.createElement('span');
  playlistHeartIcon.textContent = '♡';
  playlistHeartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    likePlaylist(playlist.playlistID, playlists);
    playlistLikes.textContent = playlist.likeCount;
  });

  playlistCard.append(playlistImg, playlistName, playlistHeartIcon, playlistLikes);

  playlistCard.addEventListener('click', () => openModal(playlist));

  return playlistCard;
}

function openModal(playlistData) {
  const playlistModal = createPlaylistModal(playlistData);
  document.body.appendChild(playlistModal);
  playlistModal.showModal();
}

function createPlaylistModal(playlistData) {
  const playlistModal = document.createElement('dialog');
  playlistModal.classList.add('playlist-modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
    <div class="playlist-details">
      <img src="${playlistData.playlist_art}" />
      <div class="playlist-description">
        <p>${playlistData.playlist_name}</p>
        <p>${playlistData.playlist_creator}</p>
      </div>
      <button class="close-modal">X</button>
    </div>
  `;

  const shuffleButton = document.createElement('button');
  shuffleButton.textContent = 'Shuffle';
  shuffleButton.classList.add('shuffle-button');
  shuffleButton.addEventListener('click', () => {
    shuffleSongs(songsContainer, playlistData.songs);
  });

  const songsContainer = document.createElement('div');
  songsContainer.classList.add('song-list');
  loadSongs(songsContainer, playlistData.songs);

  modalContent.append(shuffleButton, songsContainer);
  playlistModal.appendChild(modalContent);

  const closeModalButton = modalContent.querySelector('.close-modal');
  closeModalButton.addEventListener('click', closeModal);

  playlistModal.addEventListener('click', (event) => {
    if (event.target === playlistModal) {
      closeModal();
    }
  });

  return playlistModal;
}

function closeModal() {
  const playlistModal = document.querySelector('.playlist-modal');
  if (playlistModal) {
    playlistModal.close();
    playlistModal.remove();
  }
}

function onLoad() {
  loadPlaylists();
}

onLoad();

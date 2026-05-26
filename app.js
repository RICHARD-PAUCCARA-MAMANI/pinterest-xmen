// ===== IndexedDB Persistence =====
class IDBStore {
  constructor(dbName = 'freebuff-music', storeName = 'songs') {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };
      request.onerror = (event) => {
        console.warn('IndexedDB no disponible:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async put(item) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.put(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// ===== User Song Library =====
class UserLibrary {
  constructor() {
    this.songs = [];
    this.idCounter = 0;
    this._idb = null;
    this._loading = true;
  }

  async initFromIDB() {
    try {
      this._idb = new IDBStore();
      await this._idb.open();
      const stored = await this._idb.getAll();

      stored.forEach(item => {
        const url = URL.createObjectURL(item.file);
        let coverUrl = null;
        if (item.coverFile) {
          coverUrl = URL.createObjectURL(item.coverFile);
        }
        this.songs.push({
          id: item.id,
          file: item.file,
          url,
          title: item.title,
          artist: item.artist || 'Usuario',
          album: item.album || 'Mis Canciones',
          duration: item.duration || 0,
          size: item.file.size,
          gradient: item.gradient || this._randomGradient(),
          coverIcon: item.coverIcon || this._randomIcon(),
          type: item.file.type,
          coverFile: item.coverFile || null,
          coverUrl: coverUrl
        });
        if (item.id >= this.idCounter) this.idCounter = item.id + 1;

        // Reload duration for songs that didn't have it yet
        if (!item.duration) {
          this._loadDuration(this.songs[this.songs.length - 1]);
        }
      });

      this._sortSongs();
      console.log(`📀 Cargadas ${stored.length} canciones desde IndexedDB`);
    } catch (err) {
      console.warn('⚠️ No se pudo cargar desde IndexedDB, modo solo memoria:', err.message);
      this._idb = null;
    }
    this._loading = false;
  }

  async addSongs(fileList) {
    const added = [];
    for (const file of fileList) {
      if (!file.type.startsWith('audio/')) continue;
      const id = this.idCounter++;
      const url = URL.createObjectURL(file);
      const song = {
        id,
        file,
        url,
        title: this._cleanFileName(file.name),
        artist: 'Usuario',
        album: 'Mis Canciones',
        duration: 0,
        size: file.size,
        gradient: this._randomGradient(),
        coverIcon: this._randomIcon(),
        type: file.type,
        coverFile: null,
        coverUrl: null
      };
      this.songs.push(song);
      added.push(song);
      this._loadDuration(song);

      // Persist to IndexedDB
      if (this._idb) {
        try {
          await this._idb.put({
            id: song.id,
            file: song.file,
            title: song.title,
            artist: song.artist,
            album: song.album,
            duration: song.duration,
            gradient: song.gradient,
            coverIcon: song.coverIcon,
            coverFile: null
          });
        } catch (err) {
          console.warn('⚠️ Error guardando en IndexedDB:', err.message);
        }
      }
    }
    this._sortSongs();
    return added;
  }

  async setCover(songId, file) {
    const song = this.getSong(songId);
    if (!song) return;
    // Revoke old cover URL if any
    if (song.coverUrl) URL.revokeObjectURL(song.coverUrl);
    song.coverFile = file;
    song.coverUrl = file ? URL.createObjectURL(file) : null;
    // Persist to IndexedDB
    if (this._idb) {
      try {
        await this._idb.put({
          id: song.id,
          file: song.file,
          title: song.title,
          artist: song.artist,
          album: song.album,
          duration: song.duration,
          gradient: song.gradient,
          coverIcon: song.coverIcon,
          coverFile: song.coverFile
        });
      } catch (err) {
        console.warn('⚠️ Error guardando cover en IndexedDB:', err.message);
      }
    }
  }

  async removeSong(id) {
    const idx = this.songs.findIndex(s => s.id === id);
    if (idx === -1) return false;
    const song = this.songs[idx];
    URL.revokeObjectURL(song.url);
    if (song.coverUrl) URL.revokeObjectURL(song.coverUrl);
    this.songs.splice(idx, 1);

    if (this._idb) {
      try {
        await this._idb.delete(id);
      } catch (err) {
        console.warn('⚠️ Error eliminando de IndexedDB:', err.message);
      }
    }
    return true;
  }

  async clearAll() {
    this.songs.forEach(s => {
      URL.revokeObjectURL(s.url);
      if (s.coverUrl) URL.revokeObjectURL(s.coverUrl);
    });
    this.songs = [];
    this.idCounter = 0;

    if (this._idb) {
      try {
        await this._idb.clear();
      } catch (err) {
        console.warn('⚠️ Error limpiando IndexedDB:', err.message);
      }
    }
  }

  getSong(id) {
    return this.songs.find(s => s.id === id);
  }

  getAll() {
    return [...this.songs];
  }

  get count() {
    return this.songs.length;
  }

  getSongIndex(id) {
    return this.songs.findIndex(s => s.id === id);
  }

  _sortSongs() {
    this.songs.sort((a, b) => a.title.localeCompare(b.title));
  }

  _persistSong(song) {
    if (!this._idb) return;
    this._idb.put({
      id: song.id,
      file: song.file,
      title: song.title,
      artist: song.artist,
      album: song.album,
      duration: song.duration,
      gradient: song.gradient,
      coverIcon: song.coverIcon,
      coverFile: song.coverFile
    }).catch(err => console.warn('⚠️ Error actualizando en IDB:', err.message));
  }

  _cleanFileName(name) {
    return name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim() || 'Canción sin nombre';
  }

  _loadDuration(song) {
    const audio = new Audio(song.url);
    audio.preload = 'metadata';
    audio.addEventListener('loadedmetadata', () => {
      song.duration = audio.duration || 0;
      // Update UI
      const cards = document.querySelectorAll(`.song-card[data-id="${song.id}"]`);
      cards.forEach(card => {
        const timeEl = card.querySelector('.song-duration');
        if (timeEl) timeEl.textContent = formatTime(song.duration);
      });
      // Persist updated duration to IndexedDB
      if (song.duration > 0 && this.getSong(song.id)) {
        this._persistSong(song);
      }
    }, { once: true });
    // Fallback after 3 seconds
    setTimeout(() => {
      if (!song.duration && audio.readyState >= 1) {
        song.duration = audio.duration || 0;
      }
    }, 3000);
  }

  _randomGradient() {
    const gradients = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #a18cd1, #fbc2eb)',
      'linear-gradient(135deg, #fc4a1a, #f7b733)',
      'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      'linear-gradient(135deg, #11998e, #38ef7d)',
      'linear-gradient(135deg, #cb2d3e, #ef473a)',
      'linear-gradient(135deg, #1DB954, #191414)',
      'linear-gradient(135deg, #E13300, #FFA07A)',
      'linear-gradient(135deg, #8400E7, #C084FC)',
      'linear-gradient(135deg, #0D73EC, #60A5FA)',
      'linear-gradient(135deg, #DC2626, #FCA5A5)',
      'linear-gradient(135deg, #BA5D07, #FFD700)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  _randomIcon() {
    const icons = [
      'fa-solid fa-music', 'fa-solid fa-headphones', 'fa-solid fa-guitar',
      'fa-solid fa-drum', 'fa-solid fa-piano-keyboard', 'fa-solid fa-microphone',
      'fa-solid fa-radio', 'fa-solid fa-record-vinyl', 'fa-solid fa-compact-disc',
      'fa-solid fa-waveform', 'fa-solid fa-circle-nodes', 'fa-solid fa-volume-high'
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  }
}

// ===== Audio Player Engine =====
class AudioPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.currentSongId = null;
    this.queue = [];
    this.queueIndex = -1;
    this.isPlaying = false;
    this.isShuffled = false;
    this.repeatMode = 'off';
    this.volume = 0.7;
    this.listeners = {};

    this.audio.addEventListener('timeupdate', () => this._emit('timeupdate'));
    this.audio.addEventListener('ended', () => this._onEnded());
    this.audio.addEventListener('loadedmetadata', () => this._emit('loaded'));
    this.audio.addEventListener('error', () => {
      console.warn('🔇 Error cargando el audio');
      this._emit('error');
    });
    this.audio.volume = this.volume;
  }

  on(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter(f => f !== fn);
    };
  }

  _emit(event, data) {
    (this.listeners[event] || []).forEach(fn => fn(data));
  }

  setQueue(songs) {
    this.queue = songs.map(s => s.id);
    this.queueIndex = this.currentSongId ? this.queue.indexOf(this.currentSongId) : 0;
    if (this.queueIndex === -1 && this.queue.length > 0) {
      this.queueIndex = 0;
    }
  }

  playSong(songId, library) {
    const song = library.getSong(songId);
    if (!song) return;
    
    if (songId === this.currentSongId && this.audio.src) {
      this.togglePlay();
      return;
    }

    this.currentSongId = songId;
    this.queueIndex = this.queue.indexOf(songId);
    if (this.queueIndex === -1) {
      this.queue.push(songId);
      this.queueIndex = this.queue.length - 1;
    }

    this.audio.src = song.url;
    this.audio.load();
    this._emit('songchange', song);
    
    // Auto-play once loaded
    const playHandler = () => {
      this.play();
      this.audio.removeEventListener('canplay', playHandler);
    };
    this.audio.addEventListener('canplay', playHandler);
  }

  play() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('🔇 No se pudo reproducir. ¿Archivo de audio válido?', err.message);
      });
    }
    this.isPlaying = true;
    this._emit('playstate', true);
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this._emit('playstate', false);
  }

  togglePlay() {
    if (this.isPlaying) this.pause();
    else this.play();
  }

  seek(percent) {
    if (this.audio.duration) {
      this.audio.currentTime = (percent / 100) * this.audio.duration;
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.audio.volume = this.volume;
    this._emit('volumechange', this.volume);
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this._emit('mutechange', this.audio.muted);
  }

  get muted() { return this.audio.muted; }
  get currentTime() { return this.audio.currentTime || 0; }
  get duration() { return this.audio.duration || 0; }
  get progress() {
    return this.duration ? (this.currentTime / this.duration) * 100 : 0;
  }

  next(library) {
    if (this.queue.length === 0) return;
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.play();
      return;
    }
    let idx = this.queueIndex;
    if (this.repeatMode === 'all') {
      idx = (idx + 1) % this.queue.length;
    } else {
      // 'off' mode — if at the last song, stop
      if (idx >= this.queue.length - 1) {
        this.audio.pause();
        this.isPlaying = false;
        this._emit('playstate', false);
        return;
      }
      idx = idx + 1;
    }
    if (idx < this.queue.length) {
      this.playSong(this.queue[idx], library);
    }
  }

  prev(library) {
    if (this.queue.length === 0) return;
    if (this.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    let idx = this.queueIndex;
    idx = (idx - 1 + this.queue.length) % this.queue.length;
    this.playSong(this.queue[idx], library);
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    this._emit('shufflechange', this.isShuffled);
  }

  toggleRepeat() {
    const modes = ['off', 'one', 'all'];
    const idx = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(idx + 1) % modes.length];
    this._emit('repeatchange', this.repeatMode);
  }

  _onEnded() {
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.play();
    } else {
      this._emit('ended');
    }
  }
}

// ===== Initialize =====
const library = new UserLibrary();
const player = new AudioPlayer();

// ===== DOM References =====
const songsGrid = document.getElementById('songsGrid');
const emptyState = document.getElementById('emptyState');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');
const heroMeta = document.getElementById('heroMeta');
const heroSongCount = document.getElementById('heroSongCount');
const heroCover = document.getElementById('heroCover');
const heroPlayBtn = document.getElementById('heroPlayBtn');
const heroFavBtn = document.querySelector('.fav-btn');
const mainPlayBtn = document.getElementById('mainPlayBtn');
const prevBtnPlayer = document.getElementById('prevBtnPlayer');
const nextBtnPlayer = document.getElementById('nextBtnPlayer');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const volumeBar = document.getElementById('volumeBar');
const volumeFill = document.getElementById('volumeFill');
const muteBtn = document.getElementById('muteBtn');
const likeBtn = document.querySelector('.like-btn');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const nowPlayingArtist = document.getElementById('nowPlayingArtist');
const nowPlayingCover = document.getElementById('nowPlayingCover');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const userProfile = document.getElementById('userProfile');
const navItems = document.querySelectorAll('.nav-item');

// Upload buttons
const uploadBtn = document.getElementById('uploadBtn');
const uploadHeroBtn = document.getElementById('uploadHeroBtn');
const uploadActionBtn = document.getElementById('uploadActionBtn');
const emptyStateBtn = document.getElementById('emptyStateBtn');

// Cover image input
const coverInput = document.getElementById('coverInput');

// ===== Utility Functions =====
function formatTime(seconds) {
  if (!seconds || isNaN(seconds) || seconds === Infinity) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function getVolumeIcon(vol) {
  if (vol === 0) return 'fa-solid fa-volume-xmark';
  if (vol < 0.3) return 'fa-solid fa-volume-low';
  if (vol < 0.7) return 'fa-solid fa-volume';
  return 'fa-solid fa-volume-high';
}

function updateVolumeIcon(vol) {
  const icon = muteBtn.querySelector('i');
  if (!player.muted) {
    icon.className = getVolumeIcon(vol);
  }
}

// ===== Render Library =====
function renderLibrary() {
  const songs = library.getAll();
  songsGrid.innerHTML = '';

  if (songs.length === 0) {
    emptyState.style.display = 'flex';
    songsGrid.style.display = 'none';
    heroTitle.innerHTML = 'Tus<br/>Canciones';
    heroDesc.textContent = 'Sube tus archivos de audio y reprodúcelos al instante. Soporta MP3, WAV, OGG, FLAC y más.';
    heroSongCount.textContent = '0 canciones';
    heroMeta.innerHTML = `
      <span class="hero-user"><i class="fa-solid fa-user"></i> Freebuff Music</span>
      <span class="hero-sep">•</span>
      <span>0 canciones</span>
    `;
    heroCover.innerHTML = `
      <div class="cover-shape cover-1"></div>
      <div class="cover-shape cover-2"></div>
      <div class="cover-shape cover-3"></div>
      <div class="cover-shape cover-4"></div>
    `;
    updatePlayerQueue();
    return;
  }

  emptyState.style.display = 'none';
  songsGrid.style.display = 'grid';

  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.dataset.id = song.id;
    
    const hasCover = song.coverUrl;
    const imgHtml = hasCover
      ? `<img class="song-card-cover" src="${song.coverUrl}" alt="${escapeHtml(song.title)}" />`
      : `<div class="song-card-img" style="background: ${song.gradient}"><i class="${song.coverIcon} song-card-img-icon"></i></div>`;

    card.innerHTML = `
      <div class="song-card-img-wrapper">
        ${imgHtml}
        <button class="card-play-btn" aria-label="Reproducir"><i class="fa-solid fa-play"></i></button>
        <button class="song-cover-btn" data-id="${song.id}" aria-label="Cambiar portada">
          <i class="fa-solid fa-image"></i>
        </button>
      </div>
      <h3 class="song-card-title">${escapeHtml(song.title)}</h3>
      <p class="song-card-artist">${escapeHtml(song.artist)}</p>
      <div class="song-card-meta">
        <span class="song-duration">${formatTime(song.duration)}</span>
        <span class="song-size">${formatFileSize(song.size)}</span>
      </div>
      <button class="song-remove-btn" data-id="${song.id}" aria-label="Eliminar">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    songsGrid.appendChild(card);
  });

  // Update hero
  heroTitle.innerHTML = `Tu<br/>Biblioteca`;
  heroDesc.textContent = `${songs.length} canciones en tu biblioteca personal.`;
  heroSongCount.textContent = `${songs.length} canciones`;
  heroMeta.innerHTML = `
    <span class="hero-user"><i class="fa-solid fa-user"></i> Freebuff Music</span>
    <span class="hero-sep">•</span>
    <span>${songs.length} canciones</span>
    <span class="hero-sep">•</span>
    <span>${formatTime(songs.reduce((acc, s) => acc + s.duration, 0))} total</span>
  `;
  heroCover.innerHTML = `
    <div class="cover-shape cover-1"></div>
    <div class="cover-shape cover-2"></div>
    <div class="cover-shape cover-3"></div>
    <div class="cover-shape cover-4"></div>
  `;

  updatePlayerQueue();
  attachSongEvents();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function attachSongEvents() {
  // Play buttons on song cards
  document.querySelectorAll('.song-card .card-play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.song-card');
      const id = parseInt(card.dataset.id);
      player.playSong(id, library);
    });
  });

  // Click on song card body
  document.querySelectorAll('.song-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-play-btn') || e.target.closest('.song-remove-btn')) return;
      const id = parseInt(card.dataset.id);
      player.playSong(id, library);
    });
  });

  // Remove buttons
  document.querySelectorAll('.song-remove-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const wasPlaying = player.currentSongId === id;
      await library.removeSong(id);
      if (wasPlaying) {
        player.audio.pause();
        player.isPlaying = false;
        player.currentSongId = null;
        player._emit('playstate', false);
        player._emit('songchange', null);
      }
      renderLibrary();
    });
  });

  // Cover change buttons
  document.querySelectorAll('.song-cover-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      coverInput.dataset.targetId = id;
      coverInput.click();
    });
  });
}

function updatePlayerQueue() {
  player.setQueue(library.getAll());
}

// ===== File Upload =====
async function handleFiles(files) {
  const added = await library.addSongs(files);
  if (added.length > 0) {
    renderLibrary();
    showToast(`Se subieron ${added.length} cancione${added.length === 1 ? 'n' : 's'}`);
  }
}

// Upload button triggers file input
[uploadBtn, uploadHeroBtn, uploadActionBtn, emptyStateBtn].forEach(btn => {
  btn.addEventListener('click', () => fileInput.click());
});

// File input change
fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFiles(e.target.files);
  }
  fileInput.value = '';
});

// Cover image input change
coverInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const targetId = parseInt(coverInput.dataset.targetId);
  if (file && !isNaN(targetId)) {
    library.setCover(targetId, file).then(() => {
      renderLibrary();
      // If this song is currently playing, update hero & player
      if (player.currentSongId === targetId) {
        const song = library.getSong(targetId);
        if (song) player._emit('songchange', song);
      }
      showToast('Portada actualizada');
    });
  }
  coverInput.value = '';
  delete coverInput.dataset.targetId;
});

// ===== Drag & Drop =====
let dragCounter = 0;

document.addEventListener('dragenter', (e) => {
  e.preventDefault();
  dragCounter++;
  if (dragCounter === 1) {
    dropZone.classList.add('active');
  }
});

document.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter === 0) {
    dropZone.classList.remove('active');
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  e.preventDefault();
  dragCounter = 0;
  dropZone.classList.remove('active');
  if (e.dataTransfer.files.length > 0) {
    handleFiles(e.dataTransfer.files);
  }
});

// ===== Player UI Updates =====
player.on('playstate', (playing) => {
  const icon = mainPlayBtn.querySelector('i');
  icon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  mainPlayBtn.style.background = playing ? '#1DB954' : '#fff';
  mainPlayBtn.style.color = '#000';

  // Sync card play buttons
  document.querySelectorAll('.song-card .card-play-btn i').forEach(icon => {
    icon.className = 'fa-solid fa-play';
  });
  if (playing && player.currentSongId !== null) {
    const activeCard = document.querySelector(`.song-card[data-id="${player.currentSongId}"]`);
    if (activeCard) {
      const playBtn = activeCard.querySelector('.card-play-btn i');
      if (playBtn) playBtn.className = 'fa-solid fa-pause';
    }
  }
});

function updateCoverDisplay(container, song) {
  if (song && song.coverUrl) {
    container.style.background = `url(${song.coverUrl}) center / cover no-repeat`;
    const iconEl = container.querySelector('i');
    if (iconEl) iconEl.style.display = 'none';
  } else if (song) {
    container.style.background = song.gradient;
    let iconEl = container.querySelector('i');
    if (!iconEl) {
      iconEl = document.createElement('i');
      container.appendChild(iconEl);
    }
    iconEl.className = song.coverIcon;
    iconEl.style.fontSize = '22px';
    iconEl.style.color = 'rgba(255,255,255,0.5)';
    iconEl.style.display = '';
  } else {
    container.style.background = 'linear-gradient(135deg, #1DB954, #191414)';
    let iconEl = container.querySelector('i');
    if (!iconEl) {
      iconEl = document.createElement('i');
      container.appendChild(iconEl);
    }
    iconEl.className = 'fa-solid fa-headphones';
    iconEl.style.fontSize = '22px';
    iconEl.style.color = 'rgba(255,255,255,0.5)';
    iconEl.style.display = '';
  }
}

player.on('songchange', (song) => {
  if (!song) {
    nowPlayingTitle.textContent = 'Ninguna canción';
    nowPlayingArtist.textContent = 'Sube música para empezar';
    updateCoverDisplay(nowPlayingCover, null);
    totalTimeEl.textContent = '0:00';
    currentTimeEl.textContent = '0:00';
    progressFill.style.width = '0%';
    // Reset hero
    document.querySelector('.hero-label').textContent = 'TU BIBLIOTECA';
    heroTitle.innerHTML = 'Tus<br/>Canciones';
    heroDesc.textContent = 'Sube tus archivos de audio y reprodúcelos al instante. Soporta MP3, WAV, OGG, FLAC y más.';
    heroMeta.innerHTML = `
      <span class="hero-user"><i class="fa-solid fa-user"></i> Freebuff Music</span>
      <span class="hero-sep">•</span>
      <span>${library.count} canciones</span>
    `;
    heroCover.innerHTML = `
      <div class="cover-shape cover-1"></div>
      <div class="cover-shape cover-2"></div>
      <div class="cover-shape cover-3"></div>
      <div class="cover-shape cover-4"></div>
    `;
    return;
  }

  nowPlayingTitle.textContent = song.title;
  nowPlayingArtist.textContent = song.artist;
  updateCoverDisplay(nowPlayingCover, song);

  totalTimeEl.textContent = formatTime(song.duration);

  // Update hero
  document.querySelector('.hero-label').textContent = 'REPRODUCIENDO';
  heroTitle.innerHTML = song.title.replace(/\s/g, '<br/>');
  heroDesc.textContent = `Subida por ti — ${song.artist}`;
  heroMeta.innerHTML = `
    <span class="hero-user"><i class="fa-solid fa-user"></i> ${song.artist}</span>
    <span class="hero-sep">•</span>
    <span>${song.album}</span>
    <span class="hero-sep">•</span>
    <span>${formatTime(song.duration)}</span>
  `;

  // Show cover in hero art when playing a song with custom cover
  if (song.coverUrl) {
    heroCover.innerHTML = `<img src="${song.coverUrl}" alt="${escapeHtml(song.title)}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md);" />`;
  } else {
    heroCover.innerHTML = `
      <div class="cover-shape cover-1"></div>
      <div class="cover-shape cover-2"></div>
      <div class="cover-shape cover-3"></div>
      <div class="cover-shape cover-4"></div>
    `;
  }
});

player.on('timeupdate', () => {
  const pct = player.progress;
  progressFill.style.width = pct + '%';
  currentTimeEl.textContent = formatTime(player.currentTime);
});

player.on('volumechange', (vol) => {
  volumeFill.style.width = (vol * 100) + '%';
  updateVolumeIcon(vol);
});

player.on('mutechange', (muted) => {
  const icon = muteBtn.querySelector('i');
  icon.className = muted ? 'fa-solid fa-volume-xmark' : getVolumeIcon(player.volume);
  volumeFill.style.width = muted ? '0%' : (player.volume * 100) + '%';
});

player.on('shufflechange', (shuffled) => {
  shuffleBtn.style.color = shuffled ? '#1DB954' : '';
});

player.on('repeatchange', (mode) => {
  const colors = { off: '', one: '#1DB954', all: '#1DB954' };
  repeatBtn.style.color = colors[mode] || '';
  const icon = repeatBtn.querySelector('i');
  icon.className = mode === 'one' ? 'fa-solid fa-repeat-1' : 'fa-solid fa-repeat';
});

player.on('ended', () => {
  // Auto-play next song
  player.next(library);
});

// ===== Player Controls =====
mainPlayBtn.addEventListener('click', () => {
  if (player.currentSongId === null) {
    const songs = library.getAll();
    if (songs.length > 0) {
      player.playSong(songs[0].id, library);
      return;
    }
    showToast('No hay canciones en tu biblioteca. ¡Sube algunas!');
    return;
  }
  player.togglePlay();
});

heroPlayBtn.addEventListener('click', () => {
  if (player.currentSongId === null) {
    const songs = library.getAll();
    if (songs.length > 0) {
      player.playSong(songs[0].id, library);
      return;
    }
    showToast('No hay canciones en tu biblioteca. ¡Sube algunas!');
    return;
  }
  player.togglePlay();
});

prevBtnPlayer.addEventListener('click', () => player.prev(library));
nextBtnPlayer.addEventListener('click', () => player.next(library));

shuffleBtn.addEventListener('click', () => player.toggleShuffle());
repeatBtn.addEventListener('click', () => player.toggleRepeat());

// ===== Progress Bar =====
let isDraggingProgress = false;

progressBar.addEventListener('mousedown', (e) => {
  if (player.duration) {
    isDraggingProgress = true;
    updateProgressFromEvent(e);
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingProgress) updateProgressFromEvent(e);
});

document.addEventListener('mouseup', () => { isDraggingProgress = false; });

function updateProgressFromEvent(e) {
  const rect = progressBar.getBoundingClientRect();
  let pct = ((e.clientX - rect.left) / rect.width) * 100;
  pct = Math.max(0, Math.min(100, pct));
  progressFill.style.width = pct + '%';
  if (player.duration) {
    const secs = (pct / 100) * player.duration;
    currentTimeEl.textContent = formatTime(secs);
  }
  player.seek(pct);
}

// ===== Volume Bar =====
let isDraggingVolume = false;

volumeBar.addEventListener('mousedown', (e) => {
  isDraggingVolume = true;
  updateVolumeFromEvent(e);
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingVolume) updateVolumeFromEvent(e);
});

document.addEventListener('mouseup', () => { isDraggingVolume = false; });

function updateVolumeFromEvent(e) {
  const rect = volumeBar.getBoundingClientRect();
  let pct = ((e.clientX - rect.left) / rect.width) * 100;
  pct = Math.max(0, Math.min(100, pct));
  player.setVolume(pct / 100);
}

// ===== Mute Button =====
muteBtn.addEventListener('click', () => player.toggleMute());

// ===== Like Button =====
let isLiked = false;
likeBtn.addEventListener('click', () => {
  isLiked = !isLiked;
  const icon = likeBtn.querySelector('i');
  icon.className = isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  likeBtn.classList.toggle('liked', isLiked);
});

heroFavBtn.addEventListener('click', () => {
  const icon = heroFavBtn.querySelector('i');
  if (icon.classList.contains('fa-regular')) {
    icon.className = 'fa-solid fa-heart';
    icon.style.color = '#1DB954';
  } else {
    icon.className = 'fa-regular fa-heart';
    icon.style.color = '';
  }
});

// ===== Clear All =====
clearAllBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (library.count === 0) return;
  if (!confirm('¿Eliminar todas las canciones de tu biblioteca?')) return;
  await library.clearAll();
  player.audio.pause();
  player.isPlaying = false;
  player.currentSongId = null;
  player._emit('playstate', false);
  player._emit('songchange', null);
  renderLibrary();
  showToast('Todas las canciones fueron eliminadas');
});

// ===== Navigation Active State =====
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== User Profile Click =====
userProfile.addEventListener('click', () => {
  userProfile.style.background = '#282828';
  setTimeout(() => { userProfile.style.background = ''; }, 200);
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
  if (e.target === document.body || e.target.tagName === 'BODY') {
    if (e.code === 'Space') { e.preventDefault(); mainPlayBtn.click(); }
    if (e.key === 'm') player.toggleMute();
    if (e.key === 'ArrowRight') player.next(library);
    if (e.key === 'ArrowLeft') player.prev(library);
  }
});

// ===== Control Buttons Hover =====
document.querySelectorAll('.control-btn:not(.play-control)').forEach(btn => {
  btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.1)'; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ===== Upgrade Button =====
const upgradeBtn = document.querySelector('.upgrade-btn');
if (upgradeBtn) {
  upgradeBtn.addEventListener('click', () => {
    upgradeBtn.textContent = '✓ Actualizado';
    upgradeBtn.style.borderColor = '#1DB954';
    upgradeBtn.style.color = '#1DB954';
    setTimeout(() => {
      upgradeBtn.textContent = 'Mejorar cuenta';
      upgradeBtn.style.borderColor = '';
      upgradeBtn.style.color = '';
    }, 2000);
  });
}

// ===== Toast Notification =====
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ===== Initial Render (async with IndexedDB load) =====
(async () => {
  await library.initFromIDB();
  renderLibrary();
  console.log('🎵 Freebuff Music — Upload Player Ready');
})();

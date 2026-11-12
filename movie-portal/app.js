// ========================================================
// CineStream - Main Frontend Application Logic (Movies & Series)
// Ready-Made Dual Mode: Works with Supabase OR Local Storage!
// ========================================================

// Default Starter Content (Movies + Multi-season Web Series)
const DEFAULT_MEDIA = [
  {
    id: 'starter-1',
    content_type: 'movie',
    title: 'Inception',
    description: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.',
    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    download_url: 'https://example.com/download/inception',
    download_url_backup: 'https://example.com/download/inception-mirror',
    category: 'Sci-Fi',
    quality: '4K UHD',
    year: '2010',
    file_size: '2.4 GB',
    rating: '8.8'
  },
  {
    id: 'starter-s1',
    content_type: 'series',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    poster_url: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=800&q=80',
    category: 'Sci-Fi',
    quality: '4K UHD',
    year: '2016-2022',
    rating: '8.7',
    total_seasons: 4,
    total_episodes: 34,
    seasons_data: [
      {
        season_number: 1,
        title: 'Season 1',
        episodes: '8 Episodes',
        quality: '1080p',
        size: '5.2 GB',
        download_url: 'https://example.com/download/stranger-things-s1',
        download_url_backup: 'https://example.com/download/stranger-things-s1-mirror'
      },
      {
        season_number: 2,
        title: 'Season 2',
        episodes: '9 Episodes',
        quality: '1080p',
        size: '5.8 GB',
        download_url: 'https://example.com/download/stranger-things-s2',
        download_url_backup: ''
      },
      {
        season_number: 3,
        title: 'Season 3',
        episodes: '8 Episodes',
        quality: '4K UHD',
        size: '8.4 GB',
        download_url: 'https://example.com/download/stranger-things-s3',
        download_url_backup: ''
      },
      {
        season_number: 4,
        title: 'Season 4',
        episodes: '9 Episodes',
        quality: '4K UHD',
        size: '11.2 GB',
        download_url: 'https://example.com/download/stranger-things-s4',
        download_url_backup: ''
      }
    ]
  },
  {
    id: 'starter-2',
    content_type: 'movie',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster_url: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    download_url: 'https://example.com/download/dark-knight',
    category: 'Action',
    quality: '1080p',
    year: '2008',
    file_size: '1.8 GB',
    rating: '9.0'
  },
  {
    id: 'starter-s2',
    content_type: 'series',
    title: 'Breaking Bad',
    description: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family future.',
    poster_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    category: 'Drama',
    quality: '1080p',
    year: '2008-2013',
    rating: '9.5',
    total_seasons: 5,
    total_episodes: 62,
    seasons_data: [
      {
        season_number: 1,
        title: 'Season 1',
        episodes: '7 Episodes',
        quality: '1080p',
        size: '4.2 GB',
        download_url: 'https://example.com/download/breaking-bad-s1',
        download_url_backup: ''
      },
      {
        season_number: 2,
        title: 'Season 2',
        episodes: '13 Episodes',
        quality: '1080p',
        size: '7.8 GB',
        download_url: 'https://example.com/download/breaking-bad-s2',
        download_url_backup: ''
      },
      {
        season_number: 3,
        title: 'Season 3',
        episodes: '13 Episodes',
        quality: '1080p',
        size: '7.9 GB',
        download_url: 'https://example.com/download/breaking-bad-s3',
        download_url_backup: ''
      },
      {
        season_number: 4,
        title: 'Season 4',
        episodes: '13 Episodes',
        quality: '1080p',
        size: '8.1 GB',
        download_url: 'https://example.com/download/breaking-bad-s4',
        download_url_backup: ''
      },
      {
        season_number: 5,
        title: 'Season 5',
        episodes: '16 Episodes',
        quality: '1080p',
        size: '9.5 GB',
        download_url: 'https://example.com/download/breaking-bad-s5',
        download_url_backup: ''
      }
    ]
  },
  {
    id: 'starter-3',
    content_type: 'movie',
    title: 'Interstellar',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    poster_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    download_url: 'https://example.com/download/interstellar',
    category: 'Sci-Fi',
    quality: '4K UHD',
    year: '2014',
    file_size: '2.8 GB',
    rating: '8.7'
  },
  {
    id: 'starter-4',
    content_type: 'movie',
    title: 'Spider-Man: Across the Spider-Verse',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    download_url: 'https://example.com/download/spiderman',
    category: 'Animation',
    quality: '1080p',
    year: '2023',
    file_size: '1.6 GB',
    rating: '8.7'
  }
];

// App State
let allMedia = [];
let selectedType = 'ALL';       // 'ALL', 'movie', 'series'
let selectedCategory = 'ALL';
let selectedQuality = 'ALL';
let searchQuery = '';

// DOM Elements
const movieGrid = document.getElementById('movieGrid');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const movieCount = document.getElementById('movieCount');
const searchInput = document.getElementById('searchInput');
const searchInputMobile = document.getElementById('searchInputMobile');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const qualityFilter = document.getElementById('qualityFilter');
const demoNotice = document.getElementById('demoNotice');
const refreshBtn = document.getElementById('refreshBtn');

// Modal Elements
const movieModal = document.getElementById('movieModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalQuality = document.getElementById('modalQuality');
const modalCategory = document.getElementById('modalCategory');
const modalYear = document.getElementById('modalYear');
const modalSize = document.getElementById('modalSize');
const modalRating = document.getElementById('modalRating');
const modalTypeBadge = document.getElementById('modalTypeBadge');

// Modal Download Sections
const modalMovieSection = document.getElementById('modalMovieSection');
const modalPrimaryDownload = document.getElementById('modalPrimaryDownload');
const modalBackupDownload = document.getElementById('modalBackupDownload');

const modalSeriesSection = document.getElementById('modalSeriesSection');
const modalSeasonsSummary = document.getElementById('modalSeasonsSummary');
const modalSeasonsContainer = document.getElementById('modalSeasonsContainer');

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadMedia();
});

// Setup Events
function setupEventListeners() {
  // Content Type Switcher
  const typeBtns = document.querySelectorAll('.type-btn');
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => {
        b.classList.remove('active', 'bg-brand-red', 'text-white', 'shadow-md', 'shadow-red-900/30');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active', 'bg-brand-red', 'text-white', 'shadow-md', 'shadow-red-900/30');
      btn.classList.remove('text-slate-400');

      selectedType = btn.getAttribute('data-type');
      filterAndRenderMedia();
    });
  });

  // Category Pill Clicks
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => {
        p.classList.remove('bg-slate-700', 'text-white', 'shadow');
        p.classList.add('bg-slate-900', 'text-slate-300');
      });
      pill.classList.remove('bg-slate-900', 'text-slate-300');
      pill.classList.add('bg-slate-700', 'text-white', 'shadow');

      selectedCategory = pill.getAttribute('data-category');
      filterAndRenderMedia();
    });
  });

  // Quality Filter
  qualityFilter.addEventListener('change', (e) => {
    selectedQuality = e.target.value;
    filterAndRenderMedia();
  });

  // Search Desktop
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    if (clearSearchBtn) {
      if (searchQuery.length > 0) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
    }
    filterAndRenderMedia();
  });

  // Search Mobile
  if (searchInputMobile) {
    searchInputMobile.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterAndRenderMedia();
    });
  }

  // Clear Search
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      filterAndRenderMedia();
    });
  }

  // Refresh Button
  refreshBtn.addEventListener('click', () => {
    loadMedia();
  });

  // Modal Close
  closeModalBtn.addEventListener('click', closeModal);
  movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) {
      closeModal();
    }
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !movieModal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// ================= LOAD MEDIA (DUAL MODE) =================
async function loadMedia() {
  loadingState.classList.remove('hidden');
  emptyState.classList.add('hidden');
  movieGrid.innerHTML = '';

  // Mode 1: Supabase Connected
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase query error, fallback to local storage:', error);
        loadFromLocalStorage(true);
      } else {
        showDemoNotice(false);
        allMedia = data || [];
      }
    } catch (err) {
      console.error('Failed to query Supabase:', err);
      loadFromLocalStorage(true);
    }
  } else {
    // Mode 2: Local Storage (Works offline & out-of-the-box!)
    loadFromLocalStorage(true);
  }

  loadingState.classList.add('hidden');
  filterAndRenderMedia();
}

function loadFromLocalStorage(showNotice) {
  showDemoNotice(showNotice);
  try {
    const stored = localStorage.getItem('cinestream_local_content');
    if (stored) {
      allMedia = JSON.parse(stored);
    } else {
      // First time initialization
      allMedia = DEFAULT_MEDIA;
      localStorage.setItem('cinestream_local_content', JSON.stringify(DEFAULT_MEDIA));
    }
  } catch (e) {
    allMedia = DEFAULT_MEDIA;
  }
}

function showDemoNotice(show) {
  if (demoNotice) {
    if (show) {
      demoNotice.classList.remove('hidden');
    } else {
      demoNotice.classList.add('hidden');
    }
  }
}

// ================= FILTER & RENDER =================
function filterAndRenderMedia() {
  let filtered = allMedia.filter(item => {
    // 1. Content Type Filter (Movie vs Series)
    const isSeries = item.content_type === 'series';
    if (selectedType === 'movie' && isSeries) return false;
    if (selectedType === 'series' && !isSeries) return false;

    // 2. Search Query filter
    const matchesSearch = searchQuery === '' || 
      (item.title && item.title.toLowerCase().includes(searchQuery)) ||
      (item.category && item.category.toLowerCase().includes(searchQuery)) ||
      (item.year && item.year.toString().includes(searchQuery));

    // 3. Category filter
    const matchesCategory = selectedCategory === 'ALL' || 
      (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());

    // 4. Quality filter
    const matchesQuality = selectedQuality === 'ALL' || 
      (item.quality && item.quality.toLowerCase() === selectedQuality.toLowerCase());

    return matchesSearch && matchesCategory && matchesQuality;
  });

  // Update Item Count
  movieCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`;

  // Check Empty State
  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    movieGrid.innerHTML = '';
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  // Render Grid Cards
  movieGrid.innerHTML = filtered.map(item => createMediaCardHTML(item)).join('');

  // Attach card click listeners
  const cards = document.querySelectorAll('.poster-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const itemId = card.getAttribute('data-id');
      const item = allMedia.find(m => String(m.id) === String(itemId));
      if (item) {
        openModal(item);
      }
    });
  });
}

// Media Card HTML Generator
function createMediaCardHTML(item) {
  const isSeries = item.content_type === 'series';
  const poster = item.poster_url || 'https://via.placeholder.com/300x450?text=No+Poster';
  const quality = item.quality || '1080p';
  const year = item.year || '2024';
  const category = item.category || 'General';
  const rating = item.rating || '7.5';

  // Subtitle / Season badge
  let seriesBadge = '';
  if (isSeries) {
    const seasons = item.total_seasons || (item.seasons_data ? item.seasons_data.length : 1);
    seriesBadge = `
      <div class="absolute bottom-2 left-2 right-2">
        <span class="px-2 py-1 rounded-md bg-purple-950/80 backdrop-blur-md text-[10px] font-bold text-purple-200 border border-purple-500/40 flex items-center justify-center gap-1.5 shadow">
          <i class="fa-solid fa-tv text-purple-400"></i> ${seasons} ${seasons === 1 ? 'Season' : 'Seasons'} Pack
        </span>
      </div>
    `;
  }

  return `
    <div 
      class="poster-card cursor-pointer group flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 relative"
      data-id="${item.id}"
    >
      <!-- Poster Container -->
      <div class="aspect-[2/3] w-full overflow-hidden bg-slate-950 relative">
        <img 
          src="${escapeHTML(poster)}" 
          alt="${escapeHTML(item.title)}" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <!-- Top Badges -->
        <div class="absolute top-2 left-2 flex items-center gap-1">
          <span class="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <i class="fa-solid fa-star text-[9px]"></i> ${escapeHTML(rating)}
          </span>
        </div>

        <div class="absolute top-2 right-2">
          ${isSeries ? `
            <span class="px-2 py-0.5 rounded bg-purple-600/90 backdrop-blur-md text-[10px] font-extrabold text-white uppercase tracking-wider shadow">
              SERIES
            </span>
          ` : `
            <span class="px-2 py-0.5 rounded bg-brand-red/90 backdrop-blur-md text-[10px] font-extrabold text-white uppercase tracking-wider shadow">
              ${escapeHTML(quality)}
            </span>
          `}
        </div>

        ${seriesBadge}

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <button class="w-full py-2 ${isSeries ? 'bg-purple-600 hover:bg-purple-700' : 'bg-brand-red hover:bg-red-700'} text-white text-xs font-bold rounded-lg shadow-lg flex items-center justify-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <i class="fa-solid ${isSeries ? 'fa-list-ol' : 'fa-download'}"></i>
            <span>${isSeries ? 'View Seasons' : 'Download Movie'}</span>
          </button>
        </div>
      </div>

      <!-- Info Area -->
      <div class="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-white text-sm truncate group-hover:text-red-400 transition-colors" title="${escapeHTML(item.title)}">
            ${escapeHTML(item.title)}
          </h3>
          <div class="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>${escapeHTML(category)}</span>
            <span>${escapeHTML(year)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ================= MODAL LOGIC =================
function openModal(item) {
  const isSeries = item.content_type === 'series';

  modalPoster.src = item.poster_url || '';
  modalTitle.textContent = item.title || 'Untitled';
  modalDesc.textContent = item.description || 'No description provided for this title.';
  modalQuality.textContent = item.quality || '1080p';
  modalCategory.textContent = item.category || 'General';
  modalYear.textContent = item.year || '2024';
  
  if (modalRating) {
    modalRating.innerHTML = `<i class="fa-solid fa-star"></i> <span>${item.rating || '7.5'}</span>`;
  }

  // Type Badge configuration
  if (isSeries) {
    modalTypeBadge.textContent = 'WEB SERIES';
    modalTypeBadge.className = 'px-2.5 py-0.5 rounded font-extrabold text-[11px] uppercase tracking-wider bg-purple-600 text-white';
    
    const seasonCount = item.total_seasons || (item.seasons_data ? item.seasons_data.length : 1);
    const episodeCount = item.total_episodes ? `${item.total_episodes} Episodes` : '';
    modalSize.textContent = `• ${seasonCount} Seasons ${episodeCount ? '(' + episodeCount + ')' : ''}`;

    // Switch to Series Section
    modalMovieSection.classList.add('hidden');
    modalSeriesSection.classList.remove('hidden');

    renderSeriesSeasons(item);
  } else {
    modalTypeBadge.textContent = 'MOVIE';
    modalTypeBadge.className = 'px-2.5 py-0.5 rounded font-extrabold text-[11px] uppercase tracking-wider bg-brand-red text-white';
    modalSize.textContent = item.file_size ? `• ${item.file_size}` : '';

    // Switch to Movie Section
    modalSeriesSection.classList.add('hidden');
    modalMovieSection.classList.remove('hidden');

    // Primary Download Link
    modalPrimaryDownload.href = item.download_url || '#';
    
    // Backup Download Link
    if (item.download_url_backup && item.download_url_backup.trim() !== '') {
      modalBackupDownload.href = item.download_url_backup;
      modalBackupDownload.classList.remove('hidden');
    } else {
      modalBackupDownload.classList.add('hidden');
    }
  }

  // Show Modal
  movieModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Render dynamic seasons inside the series modal
function renderSeriesSeasons(series) {
  let seasons = series.seasons_data;

  if (typeof seasons === 'string') {
    try {
      seasons = JSON.parse(seasons);
    } catch (e) {
      seasons = [];
    }
  }

  if (!seasons || !Array.isArray(seasons) || seasons.length === 0) {
    modalSeasonsSummary.textContent = 'Links Coming Soon';
    modalSeasonsContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
        No seasons or download links have been uploaded for this series yet.
      </div>
    `;
    return;
  }

  modalSeasonsSummary.textContent = `${seasons.length} ${seasons.length === 1 ? 'Season Available' : 'Seasons Available'}`;

  modalSeasonsContainer.innerHTML = seasons.map((s, index) => {
    const sTitle = s.title || `Season ${s.season_number || index + 1}`;
    const sEpisodes = s.episodes ? `${s.episodes}` : 'All Episodes';
    const sQuality = s.quality || '1080p';
    const sSize = s.size ? `• ${s.size}` : '';
    const sDownloadUrl = s.download_url || '#';
    const sBackupUrl = s.download_url_backup || '';

    return `
      <div class="p-3.5 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition">
        <!-- Season Info -->
        <div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-purple-950 border border-purple-800/50 text-purple-300 font-bold text-xs flex items-center justify-center">
              ${index + 1}
            </span>
            <h5 class="font-bold text-white text-sm">${escapeHTML(sTitle)}</h5>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              ${escapeHTML(sQuality)}
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1 pl-8">
            <i class="fa-solid fa-film text-[10px] mr-1 text-slate-500"></i> ${escapeHTML(sEpisodes)} ${escapeHTML(sSize)}
          </p>
        </div>

        <!-- Download Buttons for this season -->
        <div class="flex items-center gap-2 pl-8 sm:pl-0">
          <a 
            href="${escapeHTML(sDownloadUrl)}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-950/40 flex items-center gap-1.5 transition whitespace-nowrap"
          >
            <i class="fa-solid fa-download"></i>
            <span>Download Season ${index + 1}</span>
          </a>

          ${sBackupUrl && sBackupUrl.trim() !== '' ? `
            <a 
              href="${escapeHTML(sBackupUrl)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              title="Mirror / Server 2"
            >
              <i class="fa-solid fa-link"></i>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function closeModal() {
  movieModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Helpers
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

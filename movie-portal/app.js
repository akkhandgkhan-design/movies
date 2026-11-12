// ========================================================
// CineStream - High Performance Public Website Engine
// Connects to Supabase Live Database with Instant Local Fallback
// ========================================================

// Starter Default Data
const STARTER_CONTENT = [
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
    rating: '8.7'
  }
];

// App State
let allItems = [];
let currentType = 'ALL';     // 'ALL', 'movie', 'series'
let currentGenre = 'ALL';
let currentQuality = 'ALL';
let currentSearch = '';

// DOM Elements
const mediaGrid = document.getElementById('mediaGrid');
const loadingBox = document.getElementById('loadingBox');
const emptyBox = document.getElementById('emptyBox');
const itemsCountBadge = document.getElementById('itemsCountBadge');
const searchInput = document.getElementById('searchInput');
const qualitySelect = document.getElementById('qualitySelect');

// Top nav buttons
const navAllBtn = document.getElementById('navAllBtn');
const navMoviesBtn = document.getElementById('navMoviesBtn');
const navSeriesBtn = document.getElementById('navSeriesBtn');

// Type tab buttons
const typeTabAll = document.getElementById('typeTabAll');
const typeTabMovie = document.getElementById('typeTabMovie');
const typeTabSeries = document.getElementById('typeTabSeries');

// Modal Elements
const detailModal = document.getElementById('detailModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTypeBadge = document.getElementById('modalTypeBadge');
const modalQuality = document.getElementById('modalQuality');
const modalGenre = document.getElementById('modalGenre');
const modalYear = document.getElementById('modalYear');
const modalRating = document.getElementById('modalRating');

const modalMovieSection = document.getElementById('modalMovieSection');
const modalBtnDownload1 = document.getElementById('modalBtnDownload1');
const modalBtnDownload2 = document.getElementById('modalBtnDownload2');

const modalSeriesSection = document.getElementById('modalSeriesSection');
const modalSeasonsCount = document.getElementById('modalSeasonsCount');
const modalSeasonsContainer = document.getElementById('modalSeasonsContainer');

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {
  setupFilterEvents();
  setupModalEvents();
  fetchContent();
});

// Setup Listeners
function setupFilterEvents() {
  // Search
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    filterAndRender();
  });

  // Type Switcher
  const typeButtons = [typeTabAll, typeTabMovie, typeTabSeries];
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => {
        b.classList.remove('active', 'series-active');
      });
      btn.classList.add('active');
      
      currentType = btn.getAttribute('data-type');
      if (currentType === 'series') {
        btn.classList.add('series-active');
      }
      
      updateNavHighlight(currentType);
      filterAndRender();
    });
  });

  // Top Nav Clickers
  if (navAllBtn) {
    navAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      typeTabAll.click();
    });
  }
  if (navMoviesBtn) {
    navMoviesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      typeTabMovie.click();
    });
  }
  if (navSeriesBtn) {
    navSeriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      typeTabSeries.click();
    });
  }

  // Genre Pills
  const genrePills = document.querySelectorAll('.genre-pill');
  genrePills.forEach(pill => {
    pill.addEventListener('click', () => {
      genrePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentGenre = pill.getAttribute('data-genre');
      filterAndRender();
    });
  });

  // Quality Select
  qualitySelect.addEventListener('change', (e) => {
    currentQuality = e.target.value;
    filterAndRender();
  });
}

function updateNavHighlight(type) {
  [navAllBtn, navMoviesBtn, navSeriesBtn].forEach(n => n && n.classList.remove('active'));
  if (type === 'movie' && navMoviesBtn) navMoviesBtn.classList.add('active');
  else if (type === 'series' && navSeriesBtn) navSeriesBtn.classList.add('active');
  else if (navAllBtn) navAllBtn.classList.add('active');
}

// Setup Modal
function setupModalEvents() {
  closeModalBtn.addEventListener('click', closeModal);
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ================= FETCH CONTENT =================
async function fetchContent() {
  loadingBox.classList.remove('hidden');
  emptyBox.classList.add('hidden');
  mediaGrid.innerHTML = '';

  // Mode 1: Supabase Live Database
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      allItems = data || [];
    } catch (err) {
      console.warn('Supabase fetch error, fallback to cache:', err);
      loadFallbackData();
    }
  } else {
    // Mode 2: Local Cache
    loadFallbackData();
  }

  loadingBox.classList.add('hidden');
  filterAndRender();
}

function loadFallbackData() {
  try {
    const cached = localStorage.getItem('cinestream_local_content');
    if (cached) {
      allItems = JSON.parse(cached);
    } else {
      allItems = STARTER_CONTENT;
      localStorage.setItem('cinestream_local_content', JSON.stringify(STARTER_CONTENT));
    }
  } catch (e) {
    allItems = STARTER_CONTENT;
  }
}

// ================= FILTER & RENDER =================
function filterAndRender() {
  const filtered = allItems.filter(item => {
    const isSeries = item.content_type === 'series';

    // Type filter
    if (currentType === 'movie' && isSeries) return false;
    if (currentType === 'series' && !isSeries) return false;

    // Search filter
    if (currentSearch) {
      const titleMatch = item.title && item.title.toLowerCase().includes(currentSearch);
      const genreMatch = item.category && item.category.toLowerCase().includes(currentSearch);
      const yearMatch = item.year && item.year.toString().includes(currentSearch);
      if (!titleMatch && !genreMatch && !yearMatch) return false;
    }

    // Genre filter
    if (currentGenre !== 'ALL') {
      if (!item.category || item.category.toLowerCase() !== currentGenre.toLowerCase()) {
        return false;
      }
    }

    // Quality filter
    if (currentQuality !== 'ALL') {
      if (!item.quality || item.quality.toLowerCase() !== currentQuality.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  itemsCountBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'Title' : 'Titles'}`;

  if (filtered.length === 0) {
    emptyBox.classList.remove('hidden');
    mediaGrid.innerHTML = '';
    return;
  }

  emptyBox.classList.add('hidden');
  mediaGrid.innerHTML = filtered.map(item => generateCardHTML(item)).join('');

  // Attach card clicks
  document.querySelectorAll('.media-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const item = allItems.find(x => String(x.id) === String(id));
      if (item) openModal(item);
    });
  });
}

// Generate Card HTML
function generateCardHTML(item) {
  const isSeries = item.content_type === 'series';
  const poster = item.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
  const rating = item.rating || '8.0';
  const year = item.year || '2024';
  const genre = item.category || 'General';
  const quality = item.quality || '1080p';

  let seasonTag = '';
  if (isSeries) {
    const sCount = item.total_seasons || (item.seasons_data ? item.seasons_data.length : 1);
    seasonTag = `<div class="card-seasons-badge">${sCount} ${sCount === 1 ? 'Season' : 'Seasons'} Pack</div>`;
  }

  return `
    <div class="media-card" data-id="${item.id}">
      <div class="poster-holder">
        <img 
          src="${escapeHTML(poster)}" 
          alt="${escapeHTML(item.title)}" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'"
        />

        <!-- Rating Badge -->
        <div class="card-badge-rating">
          ★ ${escapeHTML(rating)}
        </div>

        <!-- Type / Quality Badge -->
        <div class="card-badge-type ${isSeries ? 'badge-series-purple' : 'badge-movie-red'}">
          ${isSeries ? 'SERIES' : escapeHTML(quality)}
        </div>

        ${seasonTag}

        <!-- Hover Overlay -->
        <div class="card-hover-overlay">
          <div class="card-hover-btn ${isSeries ? 'series-btn' : ''}">
            <span>${isSeries ? 'View Seasons' : 'Download Movie'}</span>
          </div>
        </div>
      </div>

      <div class="card-info">
        <div class="card-title" title="${escapeHTML(item.title)}">${escapeHTML(item.title)}</div>
        <div class="card-meta-row">
          <span>${escapeHTML(genre)}</span>
          <span>${escapeHTML(year)}</span>
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
  modalDescription.textContent = item.description || 'No detailed plot summary provided for this title.';
  modalGenre.textContent = item.category || 'Movie';
  modalYear.textContent = item.year || '2024';
  modalQuality.textContent = item.quality || '1080p';
  modalRating.innerHTML = `★ <span>${item.rating || '8.0'}</span>`;

  if (isSeries) {
    modalTypeBadge.textContent = 'WEB SERIES';
    modalTypeBadge.style.background = '#8b5cf6';

    modalMovieSection.classList.add('hidden');
    modalSeriesSection.classList.remove('hidden');

    renderSeriesModalSeasons(item);
  } else {
    modalTypeBadge.textContent = 'MOVIE';
    modalTypeBadge.style.background = '#e50914';

    modalSeriesSection.classList.add('hidden');
    modalMovieSection.classList.remove('hidden');

    modalBtnDownload1.href = item.download_url || '#';

    if (item.download_url_backup && item.download_url_backup.trim() !== '') {
      modalBtnDownload2.href = item.download_url_backup;
      modalBtnDownload2.classList.remove('hidden');
    } else {
      modalBtnDownload2.classList.add('hidden');
    }
  }

  detailModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function renderSeriesModalSeasons(series) {
  let seasons = series.seasons_data;

  if (typeof seasons === 'string') {
    try { seasons = JSON.parse(seasons); } catch(e) { seasons = []; }
  }

  if (!seasons || !Array.isArray(seasons) || seasons.length === 0) {
    modalSeasonsCount.textContent = 'Coming Soon';
    modalSeasonsContainer.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: #64748b; font-size: 0.8rem;">
        Seasons are being uploaded for this series.
      </div>
    `;
    return;
  }

  modalSeasonsCount.textContent = `${seasons.length} ${seasons.length === 1 ? 'Season Available' : 'Seasons Available'}`;

  modalSeasonsContainer.innerHTML = seasons.map((s, idx) => {
    const sTitle = s.title || `Season ${idx + 1}`;
    const sEps = s.episodes || 'All Episodes';
    const sSize = s.size ? `• ${s.size}` : '';
    const sQuality = s.quality || '1080p';
    const sUrl = s.download_url || '#';
    const sBackup = s.download_url_backup || '';

    return `
      <div class="season-download-card">
        <div class="season-info-left">
          <div class="season-num-tag">${idx + 1}</div>
          <div>
            <div class="season-title-text">${escapeHTML(sTitle)}</div>
            <div class="season-meta-sub">${escapeHTML(sEps)} ${escapeHTML(sSize)} • ${escapeHTML(sQuality)}</div>
          </div>
        </div>

        <div class="season-actions-right">
          <a href="${escapeHTML(sUrl)}" target="_blank" rel="noopener noreferrer" class="btn-season-get">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download Season</span>
          </a>

          ${sBackup && sBackup.trim() !== '' ? `
            <a href="${escapeHTML(sBackup)}" target="_blank" rel="noopener noreferrer" style="padding: 0.45rem 0.65rem; border-radius: 8px; background: #131927; border: 1px solid #1e2738; color: #94a3b8; font-size: 0.75rem;" title="Mirror Server">
              Link 2
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function closeModal() {
  detailModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

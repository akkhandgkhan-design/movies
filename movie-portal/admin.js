// ========================================================
// CineStream - Admin Panel Logic (Movies & Series Support)
// Dual Engine: Works with Supabase OR Local Storage!
// ========================================================

// Auth Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const adminPassInput = document.getElementById('adminPassInput');
const togglePassBtn = document.getElementById('togglePassBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// Status Elements
const adminSupabaseStatus = document.getElementById('adminSupabaseStatus');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');

// Form Elements
const uploadContentForm = document.getElementById('uploadContentForm');
const typeRadioMovie = document.getElementById('typeRadioMovie');
const typeRadioSeries = document.getElementById('typeRadioSeries');
const movieFieldsBox = document.getElementById('movieFieldsBox');
const seriesFieldsBox = document.getElementById('seriesFieldsBox');
const submitBtnText = document.getElementById('submitBtnText');
const uploadSubmitBtn = document.getElementById('uploadSubmitBtn');
const uploadFeedback = document.getElementById('uploadFeedback');

// Shared Inputs
const contentTitle = document.getElementById('contentTitle');
const contentPosterUrl = document.getElementById('contentPosterUrl');
const contentCategory = document.getElementById('contentCategory');
const contentYear = document.getElementById('contentYear');
const contentRating = document.getElementById('contentRating');
const contentDesc = document.getElementById('contentDesc');

// Movie Specific Inputs
const movieDownloadUrl = document.getElementById('movieDownloadUrl');
const movieBackupUrl = document.getElementById('movieBackupUrl');
const movieFileSize = document.getElementById('movieFileSize');
const movieQuality = document.getElementById('movieQuality');

// Series Specific Elements
const addSeasonBtn = document.getElementById('addSeasonBtn');
const seasonsListContainer = document.getElementById('seasonsListContainer');

// Live Preview Elements
const previewImage = document.getElementById('previewImage');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const previewTitle = document.getElementById('previewTitle');
const previewMeta = document.getElementById('previewMeta');
const previewTypeBadge = document.getElementById('previewTypeBadge');

// Table Elements
const moviesTableBody = document.getElementById('moviesTableBody');
const refreshTableBtn = document.getElementById('refreshTableBtn');

// Series Seasons State
let seasonsCount = 0;

// ================= INITIALIZE =================
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setupAuthEvents();
  setupContentTypeToggle();
  setupLivePreview();
  setupUploadForm();
  checkSupabaseConnection();

  // Add initial season for series
  addSeasonRow();
});

// ================= AUTHENTICATION =================
function checkAuth() {
  const isAuth = sessionStorage.getItem('cinestream_admin_auth') === 'true';
  if (isAuth) {
    showDashboard();
  } else {
    showLogin();
  }
}

function showLogin() {
  loginSection.classList.remove('hidden');
  dashboardSection.classList.add('hidden');
  logoutBtn.classList.add('hidden');
}

function showDashboard() {
  loginSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  logoutBtn.classList.remove('hidden');
  loadAdminTable();
}

function setupAuthEvents() {
  togglePassBtn.addEventListener('click', () => {
    const isPass = adminPassInput.type === 'password';
    adminPassInput.type = isPass ? 'text' : 'password';
    togglePassBtn.innerHTML = isPass ? '<i class="fa-regular fa-eye-slash text-sm"></i>' : '<i class="fa-regular fa-eye text-sm"></i>';
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = adminPassInput.value.trim();
    const expected = CONFIG.ADMIN_PASSWORD || 'admin123';

    if (entered === expected) {
      sessionStorage.setItem('cinestream_admin_auth', 'true');
      loginError.classList.add('hidden');
      showDashboard();
    } else {
      loginError.textContent = 'Ghalat password! Barah-e-karam dobara koshish karein.';
      loginError.classList.remove('hidden');
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('cinestream_admin_auth');
    showLogin();
  });
}

// ================= CHECK SUPABASE =================
function checkSupabaseConnection() {
  if (supabaseClient) {
    adminSupabaseStatus.className = 'mb-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex items-center justify-between text-xs';
    statusIndicator.className = 'w-3 h-3 rounded-full bg-emerald-500';
    statusText.textContent = 'Supabase Connected Successfully! Movies & Series live cloud database me save hongi.';
  } else {
    adminSupabaseStatus.className = 'mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-300 flex items-center justify-between text-xs';
    statusIndicator.className = 'w-3 h-3 rounded-full bg-amber-500 animate-pulse';
    statusText.innerHTML = '<strong>Local Demo Mode:</strong> Abhi Supabase keys nahi dali gayin. Nayi movies/series aapke browser ke local storage me save hongi aur frontend par foran dikhein gi!';
  }
}

// ================= CONTENT TYPE SWITCHER =================
function setupContentTypeToggle() {
  const updateTypeView = () => {
    const isSeries = typeRadioSeries.checked;
    if (isSeries) {
      movieFieldsBox.classList.add('hidden');
      seriesFieldsBox.classList.remove('hidden');
      submitBtnText.textContent = 'Publish Web Series to Database';
      
      previewTypeBadge.textContent = 'SERIES';
      previewTypeBadge.className = 'absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white uppercase';

      movieDownloadUrl.removeAttribute('required');
    } else {
      movieFieldsBox.classList.remove('hidden');
      seriesFieldsBox.classList.add('hidden');
      submitBtnText.textContent = 'Publish Movie to Database';

      previewTypeBadge.textContent = 'MOVIE';
      previewTypeBadge.className = 'absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-red text-white uppercase';

      movieDownloadUrl.setAttribute('required', 'true');
    }
    updatePreviewMeta();
  };

  typeRadioMovie.addEventListener('change', updateTypeView);
  typeRadioSeries.addEventListener('change', updateTypeView);
}

// ================= DYNAMIC SEASONS BUILDER =================
function addSeasonRow(title = '', episodes = '8 Episodes', quality = '1080p', size = '4.5 GB', downloadUrl = '', backupUrl = '') {
  seasonsCount++;
  const sNum = seasonsCount;
  const sTitle = title || `Season ${sNum}`;

  const row = document.createElement('div');
  row.className = 'season-card p-3.5 bg-slate-900 border border-purple-800/30 rounded-xl space-y-3 relative transition';
  row.id = `seasonRow_${sNum}`;

  row.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-800 pb-2">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-lg bg-purple-950 border border-purple-800/50 text-purple-300 font-bold text-xs flex items-center justify-center">
          ${sNum}
        </span>
        <input 
          type="text" 
          class="season-title-input bg-transparent font-bold text-white text-xs focus:outline-none border-b border-transparent focus:border-purple-400" 
          value="${sTitle}" 
          placeholder="Season Name"
        />
      </div>

      <button 
        type="button" 
        onclick="removeSeasonRow(${sNum})"
        class="text-xs text-red-400 hover:text-red-300 transition flex items-center gap-1"
        title="Remove this season"
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>

    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="block text-[10px] text-slate-400 font-medium mb-1">Episodes Count</label>
        <input 
          type="text" 
          class="season-episodes-input w-full bg-slate-950 border border-slate-700 rounded-lg py-1 px-2 text-xs text-white" 
          placeholder="e.g. 8 Episodes" 
          value="${episodes}"
        />
      </div>
      <div>
        <label class="block text-[10px] text-slate-400 font-medium mb-1">Quality</label>
        <select class="season-quality-input w-full bg-slate-950 border border-slate-700 rounded-lg py-1 px-2 text-xs text-white">
          <option value="1080p" ${quality === '1080p' ? 'selected' : ''}>1080p FHD</option>
          <option value="4K UHD" ${quality === '4K UHD' ? 'selected' : ''}>4K UHD</option>
          <option value="720p" ${quality === '720p' ? 'selected' : ''}>720p HD</option>
        </select>
      </div>
      <div>
        <label class="block text-[10px] text-slate-400 font-medium mb-1">Season Size</label>
        <input 
          type="text" 
          class="season-size-input w-full bg-slate-950 border border-slate-700 rounded-lg py-1 px-2 text-xs text-white" 
          placeholder="e.g. 4.5 GB" 
          value="${size}"
        />
      </div>
    </div>

    <div>
      <label class="block text-[10px] text-slate-400 font-medium mb-1">Season Download Link (Mega/GDrive/Batch) *</label>
      <input 
        type="url" 
        class="season-url-input w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-2.5 text-xs text-white focus:outline-none focus:border-purple-400" 
        placeholder="https://mega.nz/... or Google Drive folder link" 
        value="${downloadUrl}"
      />
    </div>

    <div>
      <label class="block text-[10px] text-slate-400 font-medium mb-1">Backup Link (Optional)</label>
      <input 
        type="url" 
        class="season-backup-input w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-2.5 text-xs text-white focus:outline-none focus:border-purple-400" 
        placeholder="Optional secondary link" 
        value="${backupUrl}"
      />
    </div>
  `;

  seasonsListContainer.appendChild(row);
}

window.removeSeasonRow = function(id) {
  const row = document.getElementById(`seasonRow_${id}`);
  if (row) {
    row.remove();
  }
};

addSeasonBtn.addEventListener('click', () => {
  addSeasonRow();
});

// ================= LIVE PREVIEW =================
function setupLivePreview() {
  contentPosterUrl.addEventListener('input', () => {
    const poster = contentPosterUrl.value.trim();
    if (poster) {
      previewImage.src = poster;
      previewImage.classList.remove('hidden');
      previewPlaceholder.classList.add('hidden');

      previewImage.onerror = () => {
        previewImage.classList.add('hidden');
        previewPlaceholder.classList.remove('hidden');
      };
    } else {
      previewImage.classList.add('hidden');
      previewPlaceholder.classList.remove('hidden');
    }
  });

  contentTitle.addEventListener('input', () => {
    previewTitle.textContent = contentTitle.value.trim() || 'Title Preview';
  });

  contentYear.addEventListener('input', updatePreviewMeta);
  contentCategory.addEventListener('change', updatePreviewMeta);
}

function updatePreviewMeta() {
  const year = contentYear.value.trim() || '2024';
  const category = contentCategory.value || 'Action';
  const isSeries = typeRadioSeries.checked;
  previewMeta.textContent = `${year} • ${category} ${isSeries ? '• Web Series' : '• Movie'}`;
}

// ================= FORM SUBMISSION =================
function setupUploadForm() {
  uploadContentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = contentTitle.value.trim();
    const poster_url = contentPosterUrl.value.trim();
    const isSeries = typeRadioSeries.checked;
    const category = contentCategory.value;
    const year = contentYear.value.trim() || '2024';
    const rating = contentRating.value.trim() || '8.0';
    const description = contentDesc.value.trim();

    if (!title || !poster_url) {
      showFeedback('Title aur Poster URL lazmi hain!', 'error');
      return;
    }

    let payload = {
      id: 'item_' + Date.now(),
      title,
      poster_url,
      content_type: isSeries ? 'series' : 'movie',
      category,
      year,
      rating,
      description,
      created_at: new Date().toISOString()
    };

    if (isSeries) {
      const seasonRows = seasonsListContainer.querySelectorAll('.season-card');
      const seasonsData = [];
      let totalEpisodesCount = 0;

      seasonRows.forEach((row, idx) => {
        const sTitle = row.querySelector('.season-title-input').value.trim() || `Season ${idx + 1}`;
        const sEpisodes = row.querySelector('.season-episodes-input').value.trim() || '8 Episodes';
        const sQuality = row.querySelector('.season-quality-input').value;
        const sSize = row.querySelector('.season-size-input').value.trim() || '4.5 GB';
        const sDownloadUrl = row.querySelector('.season-url-input').value.trim();
        const sBackupUrl = row.querySelector('.season-backup-input').value.trim();

        if (sDownloadUrl) {
          seasonsData.push({
            season_number: idx + 1,
            title: sTitle,
            episodes: sEpisodes,
            quality: sQuality,
            size: sSize,
            download_url: sDownloadUrl,
            download_url_backup: sBackupUrl
          });

          const numMatch = sEpisodes.match(/\d+/);
          if (numMatch) {
            totalEpisodesCount += parseInt(numMatch[0], 10);
          }
        }
      });

      if (seasonsData.length === 0) {
        showFeedback('Web series ke liye kam az kam ek Season aur uska Download Link lazmi add karein!', 'error');
        return;
      }

      payload.total_seasons = seasonsData.length;
      payload.total_episodes = totalEpisodesCount > 0 ? totalEpisodesCount : seasonsData.length * 8;
      payload.seasons_data = seasonsData;
      payload.quality = seasonsData[0].quality || '1080p';

    } else {
      const download_url = movieDownloadUrl.value.trim();
      const download_url_backup = movieBackupUrl.value.trim();
      const file_size = movieFileSize.value.trim() || '1.4 GB';
      const quality = movieQuality.value || '1080p';

      if (!download_url) {
        showFeedback('Movie ka download link lazmi dalein!', 'error');
        return;
      }

      payload.download_url = download_url;
      payload.download_url_backup = download_url_backup || null;
      payload.file_size = file_size;
      payload.quality = quality;
    }

    // Set Loading UI
    uploadSubmitBtn.disabled = true;
    uploadSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> <span>Saving...</span>';

    try {
      if (supabaseClient) {
        // Mode 1: Save to Supabase
        const { data, error } = await supabaseClient
          .from('movies')
          .insert([payload])
          .select();

        if (error) throw error;
        showFeedback(`Zabardast! "${title}" Supabase database me save ho gayi!`, 'success');
      } else {
        // Mode 2: Save to Local Storage (Demo / Offline mode)
        let localData = [];
        try {
          const stored = localStorage.getItem('cinestream_local_content');
          localData = stored ? JSON.parse(stored) : [];
        } catch (e) {
          localData = [];
        }

        localData.unshift(payload);
        localStorage.setItem('cinestream_local_content', JSON.stringify(localData));
        showFeedback(`Zabardast! "${title}" upload ho gayi (Local Mode)! Website par foran check karein.`, 'success');
      }

      // Reset form
      uploadContentForm.reset();
      typeRadioMovie.checked = true;
      movieFieldsBox.classList.remove('hidden');
      seriesFieldsBox.classList.add('hidden');
      previewTypeBadge.textContent = 'MOVIE';
      previewTypeBadge.className = 'absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-red text-white uppercase';

      // Reset seasons container
      seasonsListContainer.innerHTML = '';
      seasonsCount = 0;
      addSeasonRow();

      // Reset preview
      previewImage.classList.add('hidden');
      previewPlaceholder.classList.remove('hidden');
      previewTitle.textContent = 'Title Preview';

      // Reload Table
      loadAdminTable();

    } catch (err) {
      console.error('Upload Error:', err);
      showFeedback(`Upload fail ho gaya: ${err.message}`, 'error');
    } finally {
      uploadSubmitBtn.disabled = false;
      uploadSubmitBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> <span id="submitBtnText">Publish to Database</span>';
    }
  });

  if (refreshTableBtn) {
    refreshTableBtn.addEventListener('click', loadAdminTable);
  }
}

function showFeedback(msg, type) {
  uploadFeedback.textContent = msg;
  uploadFeedback.classList.remove('hidden');
  if (type === 'success') {
    uploadFeedback.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40';
  } else {
    uploadFeedback.className = 'p-3 rounded-xl text-xs font-semibold bg-red-950/70 text-red-300 border border-red-500/40';
  }

  setTimeout(() => {
    uploadFeedback.classList.add('hidden');
  }, 6000);
}

// ================= MANAGE TABLE =================
async function loadAdminTable() {
  moviesTableBody.innerHTML = `
    <tr>
      <td colspan="6" class="py-6 text-center text-slate-400">
        <i class="fa-solid fa-spinner animate-spin mr-1"></i> Content load ho raha hai...
      </td>
    </tr>
  `;

  let items = [];

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      items = data || [];
    } catch (err) {
      console.error('Table Load Error:', err);
      moviesTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="py-6 text-center text-red-400">
            Supabase se load karne me masla aaya: ${err.message}
          </td>
        </tr>
      `;
      return;
    }
  } else {
    // Local Storage
    try {
      const stored = localStorage.getItem('cinestream_local_content');
      items = stored ? JSON.parse(stored) : [];
    } catch (e) {
      items = [];
    }
  }

  if (!items || items.length === 0) {
    moviesTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-slate-500">
          Abhi tak koi movie ya series upload nahi hui. Upar diye gaye form se pehla item upload karein!
        </td>
      </tr>
    `;
    return;
  }

  moviesTableBody.innerHTML = items.map(m => {
    const isSeries = m.content_type === 'series';
    let seasonsInfo = '';

    if (isSeries) {
      const sCount = m.total_seasons || (m.seasons_data ? m.seasons_data.length : 1);
      seasonsInfo = `<span class="text-purple-300 font-semibold"><i class="fa-solid fa-tv text-[10px] mr-1"></i> ${sCount} Seasons</span>`;
    } else {
      seasonsInfo = `<span class="text-slate-300">${escapeHTML(m.quality || '1080p')} • ${escapeHTML(m.file_size || '1.4 GB')}</span>`;
    }

    return `
      <tr class="hover:bg-slate-800/40 transition-colors">
        <td class="py-3 px-4">
          <img 
            src="${escapeHTML(m.poster_url)}" 
            alt="Poster" 
            class="w-10 h-14 object-cover rounded border border-slate-700 bg-slate-950"
            onerror="this.src='https://via.placeholder.com/40x56?text=?'"
          />
        </td>
        <td class="py-3 px-4 font-bold text-white max-w-[200px] truncate" title="${escapeHTML(m.title)}">
          ${escapeHTML(m.title)}
        </td>
        <td class="py-3 px-4">
          ${isSeries ? `
            <span class="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 text-[10px] font-bold uppercase">
              Series
            </span>
          ` : `
            <span class="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 text-[10px] font-bold uppercase">
              Movie
            </span>
          `}
        </td>
        <td class="py-3 px-4">${seasonsInfo}</td>
        <td class="py-3 px-4 text-slate-400">${escapeHTML(m.year || '-')}</td>
        <td class="py-3 px-4 text-right">
          <button 
            onclick="deleteItem('${m.id}', '${escapeJS(m.title)}')"
            class="px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-800 text-red-300 hover:text-white border border-red-800/50 transition text-xs font-semibold"
          >
            <i class="fa-solid fa-trash-can mr-1"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Delete item
window.deleteItem = async function(id, title) {
  if (!confirm(`Kya aap waqai "${title}" ko delete karna chahte hain?`)) {
    return;
  }

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('movies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showFeedback(`"${title}" database se delete ho gayi.`, 'success');
      loadAdminTable();
    } catch (err) {
      alert(`Delete fail ho gaya: ${err.message}`);
    }
  } else {
    // Local storage delete
    try {
      const stored = localStorage.getItem('cinestream_local_content');
      let localData = stored ? JSON.parse(stored) : [];
      localData = localData.filter(item => String(item.id) !== String(id));
      localStorage.setItem('cinestream_local_content', JSON.stringify(localData));
      showFeedback(`"${title}" delete ho gayi.`, 'success');
      loadAdminTable();
    } catch (err) {
      alert(`Delete fail ho gaya: ${err.message}`);
    }
  }
};

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

function escapeJS(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'");
}

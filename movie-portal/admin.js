// ========================================================
// CineStream - Admin Control Portal Logic
// Full Live Sync Engine with Supabase Cloud
// ========================================================

// Check if user set custom Supabase keys in browser
const customUrl = localStorage.getItem('cinestream_cfg_supabase_url');
const customKey = localStorage.getItem('cinestream_cfg_supabase_key');

if (customUrl && customKey && typeof supabase !== 'undefined') {
  try {
    supabaseClient = supabase.createClient(customUrl, customKey);
    console.log('✅ Custom Supabase connected from admin settings!');
  } catch (e) {
    console.warn('Failed to connect custom supabase:', e);
  }
}

// DOM Elements - Auth
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const adminPassInput = document.getElementById('adminPassInput');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// DOM Elements - Supabase Settings Drawer
const dbStatusCard = document.getElementById('dbStatusCard');
const syncStatusDot = document.getElementById('syncStatusDot');
const syncStatusText = document.getElementById('syncStatusText');
const toggleConfigBtn = document.getElementById('toggleConfigBtn');
const configDrawer = document.getElementById('configDrawer');
const cfgSupabaseUrl = document.getElementById('cfgSupabaseUrl');
const cfgSupabaseKey = document.getElementById('cfgSupabaseKey');
const saveConfigBtn = document.getElementById('saveConfigBtn');

// DOM Elements - Form
const uploadContentForm = document.getElementById('uploadContentForm');
const radioMovie = document.getElementById('radioMovie');
const radioSeries = document.getElementById('radioSeries');
const boxMovieType = document.getElementById('boxMovieType');
const boxSeriesType = document.getElementById('boxSeriesType');

const inputTitle = document.getElementById('inputTitle');
const inputPoster = document.getElementById('inputPoster');
const movieLinksGroup = document.getElementById('movieLinksGroup');
const inputMovieLink1 = document.getElementById('inputMovieLink1');
const inputMovieLink2 = document.getElementById('inputMovieLink2');
const selectMovieQuality = document.getElementById('selectMovieQuality');
const inputMovieSize = document.getElementById('inputMovieSize');

const seriesLinksGroup = document.getElementById('seriesLinksGroup');
const btnAddSeason = document.getElementById('btnAddSeason');
const seasonsList = document.getElementById('seasonsList');

const selectCategory = document.getElementById('selectCategory');
const inputYear = document.getElementById('inputYear');
const inputRating = document.getElementById('inputRating');
const inputDescription = document.getElementById('inputDescription');
const btnPublish = document.getElementById('btnPublish');
const feedbackMsg = document.getElementById('feedbackMsg');

// DOM Elements - Preview
const previewImg = document.getElementById('previewImg');
const previewNoImg = document.getElementById('previewNoImg');
const previewTypeBadge = document.getElementById('previewTypeBadge');
const previewTitleText = document.getElementById('previewTitleText');
const previewMetaText = document.getElementById('previewMetaText');

// DOM Elements - Table
const tableBody = document.getElementById('tableBody');
const btnReloadTable = document.getElementById('btnReloadTable');

let currentSeasonIndex = 0;

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setupAuthEvents();
  setupTypeToggle();
  setupSeasonsBuilder();
  setupLivePreview();
  setupFormSubmit();
  setupConfigDrawer();
  updateSyncStatusUI();

  // Add initial season
  addSeasonCard();
});

// ================= AUTH =================
function checkAuth() {
  const isAuth = sessionStorage.getItem('cinestream_admin_auth') === 'true';
  if (isAuth) {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    loadContentTable();
  } else {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    logoutBtn.classList.add('hidden');
  }
}

function setupAuthEvents() {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = adminPassInput.value.trim();
    const expected = CONFIG.ADMIN_PASSWORD || 'admin123';

    if (entered === expected) {
      sessionStorage.setItem('cinestream_admin_auth', 'true');
      loginError.classList.add('hidden');
      checkAuth();
    } else {
      loginError.textContent = 'Ghalat password! Default password is "admin123".';
      loginError.classList.remove('hidden');
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('cinestream_admin_auth');
    checkAuth();
  });
}

// ================= CONFIG DRAWER =================
function setupConfigDrawer() {
  toggleConfigBtn.addEventListener('click', () => {
    configDrawer.classList.toggle('hidden');
  });

  // Pre-fill inputs
  cfgSupabaseUrl.value = localStorage.getItem('cinestream_cfg_supabase_url') || CONFIG.SUPABASE_URL || '';
  cfgSupabaseKey.value = localStorage.getItem('cinestream_cfg_supabase_key') || CONFIG.SUPABASE_ANON_KEY || '';

  saveConfigBtn.addEventListener('click', () => {
    const url = cfgSupabaseUrl.value.trim();
    const key = cfgSupabaseKey.value.trim();

    if (!url || !key) {
      alert('Dono URL aur Key paste karein!');
      return;
    }

    localStorage.setItem('cinestream_cfg_supabase_url', url);
    localStorage.setItem('cinestream_cfg_supabase_key', key);

    try {
      supabaseClient = supabase.createClient(url, key);
      configDrawer.classList.add('hidden');
      updateSyncStatusUI();
      alert('Kamyabi! Supabase live cloud database se connect ho gaya hai!');
      loadContentTable();
    } catch (e) {
      alert('Connection error: ' + e.message);
    }
  });
}

function updateSyncStatusUI() {
  if (supabaseClient) {
    dbStatusCard.style.borderLeftColor = '#10b981';
    syncStatusDot.style.background = '#10b981';
    syncStatusText.innerHTML = '<strong>✅ Live Cloud Connected:</strong> Jo bhi movie/series yahan upload karenge, poori dunya me live website par foran show hogi!';
  } else {
    dbStatusCard.style.borderLeftColor = '#f59e0b';
    syncStatusDot.style.background = '#f59e0b';
    syncStatusText.innerHTML = '<strong>⚠️ Local Demo Mode:</strong> Upar "Change Supabase Keys" par click karke apni keys dalein taake website poori dunya me live sync ho!';
  }
}

// ================= TYPE TOGGLE =================
function setupTypeToggle() {
  radioMovie.addEventListener('change', () => {
    boxMovieType.style.borderColor = '#e50914';
    boxMovieType.style.background = 'rgba(229, 9, 20, 0.15)';
    boxMovieType.style.color = '#fff';

    boxSeriesType.style.borderColor = '#1e2738';
    boxSeriesType.style.background = '#090c14';
    boxSeriesType.style.color = '#94a3b8';

    movieLinksGroup.classList.remove('hidden');
    seriesLinksGroup.classList.add('hidden');

    previewTypeBadge.textContent = 'MOVIE';
    previewTypeBadge.style.background = '#e50914';
  });

  radioSeries.addEventListener('change', () => {
    boxSeriesType.style.borderColor = '#8b5cf6';
    boxSeriesType.style.background = 'rgba(139, 92, 246, 0.15)';
    boxSeriesType.style.color = '#fff';

    boxMovieType.style.borderColor = '#1e2738';
    boxMovieType.style.background = '#090c14';
    boxMovieType.style.color = '#94a3b8';

    movieLinksGroup.classList.add('hidden');
    seriesLinksGroup.classList.remove('hidden');

    previewTypeBadge.textContent = 'SERIES';
    previewTypeBadge.style.background = '#8b5cf6';
  });
}

// ================= SEASONS BUILDER =================
function setupSeasonsBuilder() {
  btnAddSeason.addEventListener('click', () => {
    addSeasonCard();
  });
}

function addSeasonCard(title = '', eps = '8 Episodes', quality = '1080p', size = '4.5 GB', url1 = '', url2 = '') {
  currentSeasonIndex++;
  const idx = currentSeasonIndex;
  const sName = title || `Season ${idx}`;

  const card = document.createElement('div');
  card.className = 'season-builder-card';
  card.id = `seasonItem_${idx}`;

  card.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
      <span style="font-size: 0.8rem; font-weight: 800; color: #c084fc;">#${idx} ${sName}</span>
      <button type="button" onclick="removeSeason(${idx})" style="background: transparent; color: #f87171; font-size: 0.75rem;">
        ✕ Remove
      </button>
    </div>

    <div class="grid-3" style="margin-bottom: 0.5rem;">
      <div>
        <label class="admin-label">Season Name</label>
        <input type="text" class="admin-input s-title" value="${sName}" />
      </div>
      <div>
        <label class="admin-label">Episodes</label>
        <input type="text" class="admin-input s-eps" value="${eps}" />
      </div>
      <div>
        <label class="admin-label">Size</label>
        <input type="text" class="admin-input s-size" value="${size}" />
      </div>
    </div>

    <div style="margin-bottom: 0.5rem;">
      <label class="admin-label">Season Download Link (Mega/GDrive Batch) *</label>
      <input type="url" class="admin-input s-url" value="${url1}" placeholder="https://mega.nz/... or Google Drive folder" />
    </div>

    <div>
      <label class="admin-label">Mirror / Backup Link (Optional)</label>
      <input type="url" class="admin-input s-backup" value="${url2}" placeholder="Optional backup link" />
    </div>
  `;

  seasonsList.appendChild(card);
}

window.removeSeason = function(idx) {
  const el = document.getElementById(`seasonItem_${idx}`);
  if (el) el.remove();
};

// ================= LIVE PREVIEW =================
function setupLivePreview() {
  inputPoster.addEventListener('input', () => {
    const url = inputPoster.value.trim();
    if (url) {
      previewImg.src = url;
      previewImg.style.display = 'block';
      previewNoImg.style.display = 'none';
      previewImg.onerror = () => {
        previewImg.style.display = 'none';
        previewNoImg.style.display = 'block';
      };
    } else {
      previewImg.style.display = 'none';
      previewNoImg.style.display = 'block';
    }
  });

  inputTitle.addEventListener('input', () => {
    previewTitleText.textContent = inputTitle.value.trim() || 'Movie Title Preview';
  });

  inputYear.addEventListener('input', updateMetaPreview);
  selectCategory.addEventListener('change', updateMetaPreview);
}

function updateMetaPreview() {
  const y = inputYear.value.trim() || '2024';
  const c = selectCategory.value || 'Action';
  previewMetaText.textContent = `${y} • ${c}`;
}

// ================= SUBMIT =================
function setupFormSubmit() {
  uploadContentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = inputTitle.value.trim();
    const poster_url = inputPoster.value.trim();
    const isSeries = radioSeries.checked;
    const category = selectCategory.value;
    const year = inputYear.value.trim() || '2024';
    const rating = inputRating.value.trim() || '8.0';
    const description = inputDescription.value.trim();

    if (!title || !poster_url) {
      showToast('Title aur Poster URL lazmi hain!', 'error');
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
      const cards = seasonsList.querySelectorAll('.season-builder-card');
      const seasonsData = [];
      let totalEps = 0;

      cards.forEach((card, i) => {
        const sTitle = card.querySelector('.s-title').value.trim() || `Season ${i + 1}`;
        const sEps = card.querySelector('.s-eps').value.trim() || '8 Episodes';
        const sSize = card.querySelector('.s-size').value.trim() || '4.5 GB';
        const sUrl = card.querySelector('.s-url').value.trim();
        const sBackup = card.querySelector('.s-backup').value.trim();

        if (sUrl) {
          seasonsData.push({
            season_number: i + 1,
            title: sTitle,
            episodes: sEps,
            size: sSize,
            quality: '1080p',
            download_url: sUrl,
            download_url_backup: sBackup
          });

          const m = sEps.match(/\d+/);
          if (m) totalEps += parseInt(m[0], 10);
        }
      });

      if (seasonsData.length === 0) {
        showToast('Kam az kam ek Season aur uska Download Link lazmi dalein!', 'error');
        return;
      }

      payload.total_seasons = seasonsData.length;
      payload.total_episodes = totalEps || seasonsData.length * 8;
      payload.seasons_data = seasonsData;
      payload.quality = '1080p';

    } else {
      const dl1 = inputMovieLink1.value.trim();
      const dl2 = inputMovieLink2.value.trim();
      const quality = selectMovieQuality.value || '1080p';
      const size = inputMovieSize.value.trim() || '1.4 GB';

      if (!dl1) {
        showToast('Movie ka primary download link lazmi dalein!', 'error');
        return;
      }

      payload.download_url = dl1;
      payload.download_url_backup = dl2 || null;
      payload.quality = quality;
      payload.file_size = size;
    }

    btnPublish.disabled = true;
    btnPublish.textContent = 'Publishing...';

    try {
      if (supabaseClient) {
        // Save to Supabase Cloud
        const { error } = await supabaseClient.from('movies').insert([payload]);
        if (error) throw error;
        showToast(`🎉 "${title}" Supabase me live save ho gayi!`, 'success');
      } else {
        // Fallback to local storage
        let localData = [];
        try {
          const s = localStorage.getItem('cinestream_local_content');
          localData = s ? JSON.parse(s) : [];
        } catch (e) { localData = []; }

        localData.unshift(payload);
        localStorage.setItem('cinestream_local_content', JSON.stringify(localData));
        showToast(`"${title}" upload ho gayi (Local Mode)!`, 'success');
      }

      // Reset form
      uploadContentForm.reset();
      radioMovie.click();
      seasonsList.innerHTML = '';
      currentSeasonIndex = 0;
      addSeasonCard();

      previewImg.style.display = 'none';
      previewNoImg.style.display = 'block';

      loadContentTable();

    } catch (err) {
      console.error(err);
      showToast(`Upload error: ${err.message}`, 'error');
    } finally {
      btnPublish.disabled = false;
      btnPublish.textContent = 'Publish Content Live';
    }
  });

  btnReloadTable.addEventListener('click', loadContentTable);
}

function showToast(msg, type) {
  feedbackMsg.textContent = msg;
  feedbackMsg.classList.remove('hidden');
  if (type === 'success') {
    feedbackMsg.style.background = 'rgba(16, 185, 129, 0.2)';
    feedbackMsg.style.color = '#6ee7b7';
    feedbackMsg.style.border = '1px solid rgba(16, 185, 129, 0.4)';
  } else {
    feedbackMsg.style.background = 'rgba(239, 68, 68, 0.2)';
    feedbackMsg.style.color = '#fca5a5';
    feedbackMsg.style.border = '1px solid rgba(239, 68, 68, 0.4)';
  }
  setTimeout(() => feedbackMsg.classList.add('hidden'), 5000);
}

// ================= LOAD TABLE =================
async function loadContentTable() {
  tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #64748b;">Loading content...</td></tr>`;

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
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #f87171; padding: 1.5rem;">Supabase load error: ${err.message}</td></tr>`;
      return;
    }
  } else {
    try {
      const s = localStorage.getItem('cinestream_local_content');
      items = s ? JSON.parse(s) : [];
    } catch (e) { items = []; }
  }

  if (items.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #64748b;">Abhi koi content nahi hai. Upar se pehla item add karein!</td></tr>`;
    return;
  }

  tableBody.innerHTML = items.map(m => {
    const isSeries = m.content_type === 'series';
    const detail = isSeries 
      ? `<span style="color: #c084fc; font-weight: 700;">${m.total_seasons || 1} Seasons</span>`
      : `<span style="color: #94a3b8;">${m.quality || '1080p'} • ${m.file_size || '1.4 GB'}</span>`;

    return `
      <tr>
        <td>
          <img src="${escapeHTML(m.poster_url)}" style="width: 36px; height: 50px; object-fit: cover; border-radius: 4px; background: #000;" onerror="this.src='https://via.placeholder.com/36x50'" />
        </td>
        <td style="font-weight: 700; color: #fff; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${escapeHTML(m.title)}
        </td>
        <td>
          <span style="font-size: 0.65rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 4px; background: ${isSeries ? '#8b5cf6' : '#e50914'}; color: #fff;">
            ${isSeries ? 'SERIES' : 'MOVIE'}
          </span>
        </td>
        <td>${detail}</td>
        <td>${escapeHTML(m.year || '-')}</td>
        <td style="text-align: right;">
          <button onclick="deleteContent('${m.id}', '${escapeJS(m.title)}')" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 6px;">
            Delete
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

window.deleteContent = async function(id, title) {
  if (!confirm(`Kya aap waqai "${title}" ko delete karna chahte hain?`)) return;

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('movies').delete().eq('id', id);
      if (error) throw error;
      showToast(`"${title}" database se delete ho gayi!`, 'success');
      loadContentTable();
    } catch (e) {
      alert('Delete error: ' + e.message);
    }
  } else {
    try {
      const s = localStorage.getItem('cinestream_local_content');
      let arr = s ? JSON.parse(s) : [];
      arr = arr.filter(x => String(x.id) !== String(id));
      localStorage.setItem('cinestream_local_content', JSON.stringify(arr));
      showToast(`"${title}" delete ho gayi!`, 'success');
      loadContentTable();
    } catch (e) { alert(e.message); }
  }
};

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeJS(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'");
}

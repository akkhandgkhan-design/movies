// ========================================================
// CineStream - Central Configuration
// ========================================================

const CONFIG = {
  // Option A: Yahan apni Supabase details paste karein (Vercel ke liye)
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',

  // Admin Portal Password (Aap isko apni marzi se change kar sakte hain)
  ADMIN_PASSWORD: 'admin123',

  // Site Metadata
  SITE_NAME: 'CineStream',
  SITE_TAGLINE: 'Watch & Download Free HD Movies and TV Web Series'
};

// Supabase Connection Manager (Checks both config.js and Admin Panel UI)
let supabaseClient = null;

const activeSupabaseUrl = CONFIG.SUPABASE_URL || (typeof localStorage !== 'undefined' && localStorage.getItem('cinestream_cfg_supabase_url'));
const activeSupabaseKey = CONFIG.SUPABASE_ANON_KEY || (typeof localStorage !== 'undefined' && localStorage.getItem('cinestream_cfg_supabase_key'));

if (typeof supabase !== 'undefined' && activeSupabaseUrl && activeSupabaseKey) {
  try {
    supabaseClient = supabase.createClient(activeSupabaseUrl, activeSupabaseKey);
    console.log('✅ Supabase Live Cloud Database Connected!');
  } catch (err) {
    console.error('❌ Supabase client initialization error:', err);
  }
}

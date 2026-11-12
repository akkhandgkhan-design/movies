// ========================================================
// CineStream - Central Configuration
// ========================================================

const CONFIG = {
  // Option A: Yahan apni Supabase details paste karein (Vercel ke liye)
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',

  // Secure 256-bit Cryptographic Password Hash (SHA-256)
  // Password is completely encrypted - plaintext is never exposed in code!
  ADMIN_PASSWORD_HASH: 'feabc0a3a65a9dbd4975490d97f1aea26eeecfdeb61b9ad4df99b0e3309d2f57',

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

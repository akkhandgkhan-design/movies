// ========================================================
// Supabase Configuration
// ========================================================
// Yahan aapko apna Supabase Project URL aur Anon Key daalna hai.
// Supabase Dashboard -> Project Settings -> API me yeh dono milenge.

const CONFIG = {
  // Apna Supabase URL yahan paste karein (Example: 'https://xyzabcdef.supabase.co')
  SUPABASE_URL: '',

  // Apna Supabase Anon/Public Key yahan paste karein
  SUPABASE_ANON_KEY: '',

  // Admin Panel ka Password (aap isko apni marzi se change kar sakte hain)
  ADMIN_PASSWORD: 'admin123',

  // Site Info
  SITE_NAME: 'CineStream',
  SITE_TAGLINE: 'Download Free HD Movies & Series'
};

// Supabase Client initialize karein (agar keys mojood hon)
let supabaseClient = null;

if (typeof supabase !== 'undefined' && CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY) {
  try {
    supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected successfully!');
  } catch (err) {
    console.error('❌ Supabase connection error:', err);
  }
}

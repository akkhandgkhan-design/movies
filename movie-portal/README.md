# 🎬 CineStream - Free Movies & Web Series Portal

Yeh ek complete, fast aur 100% free movie & TV series downloading web portal hai jo **Supabase** (Database) aur **Vercel** (Free Hosting) ke sath seamlessly connect hota hai.

---

## 🌟 Naye Features (Movies + Web Series Support)

1. **Movies & Web Series Switcher:**
   * User website par **"Movies Only"** ya **"Web Series Only"** filter kar sakta hai.
2. **Web Series Manual Season-by-Season Download:**
   * Jab user kisi Series par click karega, usko saare **Seasons** ki alag list milegi (e.g. Season 1, Season 2, Season 3).
   * Har season ke aage uska Episode count, Resolution (1080p / 4K), Size aur **"Download Season"** button hoga taake user apni marzi ka season manually download kar sake!
3. **Admin Panel Dynamic Season Builder:**
   * Admin panel me **"Web Series (Seasons)"** select karein.
   * Jitne chahein **"+ Add Season"** button daba kar Season 1, Season 2 waghera add karein aur har season ka apna download link dalein.

---

## 📁 Project Structure

```text
movie-portal/
├── index.html            # Main User Frontend (Movies & Series Grid, Season-wise Modal)
├── admin.html            # Admin Panel (Upload Movies & Series with Seasons Builder)
├── config.js             # Supabase & Admin Settings (Paste your API keys here)
├── app.js                # Frontend logic & filtering
├── admin.js              # Admin authentication & season builder logic
├── supabase_schema.sql   # Supabase Database setup script
├── vercel.json           # Vercel deployment configuration
└── README.md             # Guide & documentation
```

---

## 🚀 3 Simple Steps Setup (100% Free)

### Step 1: Supabase Free Database Setup

1. [https://supabase.com](https://supabase.com) par jayein aur free account banayein.
2. **"New Project"** banayein (Free Plan select karein).
3. Left menu me **SQL Editor** par jayein.
4. `supabase_schema.sql` ke contents ko copy karein aur SQL Editor me paste karke **RUN** dabayein.
   * *Yeh automatically `movies` table me `content_type`, `total_seasons`, aur `seasons_data` add kar dega.*
5. Left menu me **Project Settings -> API** par jayein:
   * **Project URL** copy karein.
   * **Project API Keys** me `anon` `public` key copy karein.

---

### Step 2: Keys Paste Karein `config.js` me

`config.js` file ko open karein aur apni keys paste karein:

```javascript
const CONFIG = {
  // Apna Supabase URL yahan paste karein:
  SUPABASE_URL: 'https://xyzabcdef.supabase.co',

  // Apna Supabase Anon/Public Key yahan paste karein:
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

  // Admin panel ka password (default: admin123)
  ADMIN_PASSWORD: 'admin123'
};
```

---

### Step 3: Vercel par Free Deploy Karein

1. [https://vercel.com](https://vercel.com) par free account banayein.
2. Apne is `movie-portal` folder ko GitHub par upload karke Vercel me import karein ya direct Vercel CLI se deploy karein.
3. **Deploy** dabayein! 15 seconds me aapki live website (e.g. `https://cinestream.vercel.app`) tayyar ho jayegi.

---

## 💻 Abhi Test Karein:
* Apne computer par **`index.html`** par double-click karein aur dekhein ke Movies aur Web Series (with Season 1, 2, 3, 4 download buttons) kaise nazar aate hain!
* **`admin.html`** open karein (Password: `admin123`) aur "Web Series" select karke nayi series add karke check karein.

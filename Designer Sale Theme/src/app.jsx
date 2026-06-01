/* global React, ReactDOM,
   Header, Footer, HomePage, CategoryPage, BoutiquesPage, AboutPage, WishlistPage,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect, TweakColor, TweakToggle */

const { useState, useEffect } = React;

// Tweakable defaults — JSON between the markers so the host can persist edits.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "logoVariant": "editorial",
  "cardVariant": "editorial",
  "accent": "#A8854A",
  "density": "comfortable",
  "showPromoBar": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweak values to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--gold', tweaks.accent);
    // derive deep variant (dim) and soft (light) by tweaking lightness
    root.style.setProperty('--gold-deep', shade(tweaks.accent, -0.18));
    root.style.setProperty('--gold-soft', shade(tweaks.accent, 0.32));

    const d = tweaks.density === 'compact' ? 0.78
            : tweaks.density === 'spacious' ? 1.18
            : 1.0;
    root.style.setProperty('--density', String(d));
  }, [tweaks.accent, tweaks.density]);

  // ---- Routing (hash-based + state) ----
  const [route, setRoute] = useState(() => parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function navigate(page, categoryId = null, action = null) {
    let hash = '#/';
    if (page === 'category') hash = `#/c/${categoryId || 'maxi-dresses'}`;
    else if (page === 'boutiques') hash = '#/boutiques';
    else if (page === 'about') hash = '#/about';
    else if (page === 'wishlist') hash = '#/wishlist';
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.location.hash !== hash) window.location.hash = hash;
    else setRoute({ page, categoryId });
    // post-action
    if (action === 'email') {
      setTimeout(() => { if (window.dsScrollEmail) window.dsScrollEmail(); }, 100);
    }
  }
  window.dsNav = navigate;

  // ---- Wishlist (localStorage) ----
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem('ds_wishlist');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) { return new Set(); }
  });
  function toggleWishlist(id) {
    setWishlist(prev => {
      const next = new Set(prev);
      const wasIn = next.has(id);
      if (wasIn) next.delete(id); else next.add(id);
      try { localStorage.setItem('ds_wishlist', JSON.stringify([...next])); } catch (e) {}
      pushToast(wasIn ? 'Removed from wishlist' : 'Saved to wishlist');
      return next;
    });
  }

  // ---- Toasts ----
  const [toast, setToast] = useState(null);
  function pushToast(msg) {
    setToast(msg);
    clearTimeout(window.__dsToastTo);
    window.__dsToastTo = setTimeout(() => setToast(null), 2200);
  }

  function handleShop(p) {
    pushToast(`Opening ${p.merchant}…`);
  }
  function handleEmail(email) {
    if (email) pushToast(`Subscribed: ${email}`);
  }

  // ---- Render the right page ----
  const data = window.DS_DATA;
  const commonProps = {
    data,
    cardVariant: tweaks.cardVariant,
    wishlist,
    onToggleWishlist: toggleWishlist,
    onShop: handleShop,
    onNav: navigate,
  };

  return (
    <>
      <Header
        currentPage={route.page}
        currentCategory={route.categoryId}
        wishlistCount={wishlist.size}
        onNav={navigate}
        categories={data.categories}
      />

      {route.page === 'home'      && <HomePage {...commonProps} onEmailSubmit={handleEmail} />}
      {route.page === 'category'  && <CategoryPage {...commonProps} categoryId={route.categoryId} />}
      {route.page === 'boutiques' && <BoutiquesPage data={data} onNav={navigate} />}
      {route.page === 'about'     && <AboutPage onNav={navigate} />}
      {route.page === 'wishlist'  && <WishlistPage {...commonProps} />}

      <Footer onNav={navigate} categories={data.categories} />

      {/* Toast */}
      {toast && (
        <div className="toast">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--gold)' }} />
          {toast}
        </div>
      )}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakSelect
            label="Logo treatment"
            value={tweaks.logoVariant}
            onChange={(v) => setTweak('logoVariant', v)}
            options={[
              { value: 'editorial', label: 'Editorial masthead (default)' },
              { value: 'stacked',   label: 'Stacked with .COM.AU rule' },
              { value: 'caps',      label: 'All-caps refined sans' },
            ]}
          />
          <TweakColor
            label="Accent colour"
            value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}
            options={['#A8854A','#C9A84C','#B08D57','#8B6B36','#9C4A56','#3D5A6C']}
          />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakRadio
            label="Product card"
            value={tweaks.cardVariant}
            onChange={(v) => setTweak('cardVariant', v)}
            options={[
              { value: 'editorial', label: 'Editorial' },
              { value: 'boxed', label: 'Boxed' },
            ]}
          />
          <TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Comfy' },
              { value: 'spacious', label: 'Spacious' },
            ]}
          />
          <TweakToggle
            label="Show promo bar"
            value={tweaks.showPromoBar}
            onChange={(v) => setTweak('showPromoBar', v)}
          />
        </TweakSection>

        <TweakSection label="Demo">
          <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5, padding: '4px 0 8px' }}>
            Try navigating between Home → Maxi Dresses → Boutiques → About. Heart items to populate your wishlist.
          </div>
        </TweakSection>
      </TweaksPanel>

      <style>{`
        ${!tweaks.showPromoBar ? '.header-promo { display: none; }' : ''}
      `}</style>

      {/* Logo variant — applied via class on root */}
      <LogoStyleInjector variant={tweaks.logoVariant} />
    </>
  );
}

// Inject the chosen logo variant by re-rendering any matching DOM nodes.
// Simpler: pass through a global the components can read.
function LogoStyleInjector({ variant }) {
  useEffect(() => {
    window.__ds_logo_variant = variant;
    // Force a re-render by dispatching a custom event our Logo listens to.
    document.dispatchEvent(new CustomEvent('ds-logo-variant-change', { detail: variant }));
  }, [variant]);
  return null;
}

// ---- Helpers ----
function parseHash() {
  const h = window.location.hash || '#/';
  const path = h.replace(/^#/, '');
  if (path.startsWith('/c/')) return { page: 'category', categoryId: path.slice(3) || 'maxi-dresses' };
  if (path === '/boutiques') return { page: 'boutiques', categoryId: null };
  if (path === '/about')     return { page: 'about', categoryId: null };
  if (path === '/wishlist')  return { page: 'wishlist', categoryId: null };
  return { page: 'home', categoryId: null };
}

// Lighten / darken a hex by amount in [-1, 1].
function shade(hex, amt) {
  const m = hex.replace('#','');
  if (m.length !== 6) return hex;
  let r = parseInt(m.slice(0,2), 16);
  let g = parseInt(m.slice(2,4), 16);
  let b = parseInt(m.slice(4,6), 16);
  if (amt >= 0) {
    r = Math.round(r + (255 - r) * amt);
    g = Math.round(g + (255 - g) * amt);
    b = Math.round(b + (255 - b) * amt);
  } else {
    r = Math.round(r * (1 + amt));
    g = Math.round(g * (1 + amt));
    b = Math.round(b * (1 + amt));
  }
  return '#' + [r,g,b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

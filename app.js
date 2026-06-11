/* ===== IDLÈS ART GALLERY — interactions ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Header scroll state --- */
  const header = document.getElementById('main-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* --- Mobile menu --- */
  const toggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  toggle?.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navMenu.classList.remove('open'))
  );

  /* --- Language switch (FR / EN) --- */
  const frBtn = document.getElementById('lang-fr-btn');
  const enBtn = document.getElementById('lang-en-btn');
  const setLang = (lang) => {
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-fr', lang === 'fr');
    document.documentElement.lang = lang;
    frBtn?.classList.toggle('active', lang === 'fr');
    enBtn?.classList.toggle('active', lang === 'en');
    try { localStorage.setItem('idles-lang', lang); } catch (e) {}
  };
  frBtn?.addEventListener('click', () => setLang('fr'));
  enBtn?.addEventListener('click', () => setLang('en'));
  try { setLang(localStorage.getItem('idles-lang') || 'fr'); } catch (e) { setLang('fr'); }

  /* --- Active nav link on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = navMenu ? [...navMenu.querySelectorAll('a[href^="#"]')] : [];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* --- Reveal on scroll --- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* --- Gallery filters --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = [...document.querySelectorAll('.gallery-item')];
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        const show = f === 'all' || it.dataset.category === f;
        it.classList.toggle('hide', !show);
      });
    });
  });

  /* --- Lightbox --- */
  const lb = document.getElementById('lightbox-viewer');
  const lbImg = document.getElementById('lightbox-img-element');
  const lbCat = document.getElementById('lightbox-category-element');
  const lbTitle = document.getElementById('lightbox-title-element');
  const lbArtist = document.getElementById('lightbox-artist-element');
  const lbMedium = document.getElementById('lightbox-medium-element');
  const lbDim = document.getElementById('lightbox-dimensions-element');
  let currentIndex = 0;

  const readItem = (el) => {
    const img = el.querySelector('.art-img');
    const details = el.querySelectorAll('.art-details span');
    return {
      src: img?.src || '',
      alt: img?.alt || '',
      category: el.querySelector('.art-category')?.textContent.trim() || '',
      title: el.querySelector('.art-title')?.textContent.trim() || '',
      artist: el.querySelector('.art-artist')?.textContent.trim() || '',
      medium: details[0]?.textContent.trim() || '—',
      dim: details[1]?.textContent.trim() || '—',
    };
  };

  const openLightbox = (el) => {
    currentIndex = items.indexOf(el);
    const d = readItem(el);
    lbImg.src = d.src; lbImg.alt = d.alt;
    lbCat.textContent = d.category;
    lbTitle.textContent = d.title;
    lbArtist.textContent = d.artist;
    lbMedium.textContent = d.medium;
    lbDim.textContent = d.dim;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  const step = (dir) => {
    const visible = items.filter(it => !it.classList.contains('hide'));
    if (!visible.length) return;
    let pos = visible.indexOf(items[currentIndex]);
    pos = (pos + dir + visible.length) % visible.length;
    openLightbox(visible[pos]);
  };

  items.forEach(el => el.addEventListener('click', () => openLightbox(el)));
  document.getElementById('lightbox-close-btn')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev-btn')?.addEventListener('click', () => step(-1));
  document.getElementById('lightbox-next-btn')?.addEventListener('click', () => step(1));
  lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* --- File upload display --- */
  const fileInput = document.getElementById('artist-portfolio');
  const fileDisplay = document.getElementById('file-name-display');
  fileInput?.addEventListener('change', () => {
    fileDisplay.textContent = fileInput.files?.[0]?.name || '';
  });

  /* --- Toast --- */
  const toast = document.getElementById('toast-notification');
  const showToast = () => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  };

  /* --- Forms --- */
  ['artist-form', 'contact-form'].forEach(id => {
    const form = document.getElementById(id);
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.reset();
      if (fileDisplay) fileDisplay.textContent = '';
      showToast();
    });
  });
});

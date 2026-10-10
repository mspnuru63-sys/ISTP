/* =====================================================================
   ISTP — Header + Footer injection + comportements communs
   ===================================================================== */
(function () {
  const body = document.body;
  const currentPage = body.dataset.page || '';
  const currentGroup = body.dataset.group || '';
  const isSubpage = location.pathname.includes('/pages/');
  const root = isSubpage ? '../' : '';
  const pageRoot = isSubpage ? '' : 'pages/';

  /* --- Logo temple SVG --- */
  const LOGO_SVG = `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 L1 8 L1 9.6 L23 9.6 L23 8 Z"/>
      <rect x="2" y="10.2" width="20" height="1.8"/>
      <rect x="4" y="12.4" width="2" height="7.4"/>
      <rect x="8.5" y="12.4" width="2" height="7.4"/>
      <rect x="13.5" y="12.4" width="2" height="7.4"/>
      <rect x="18" y="12.4" width="2" height="7.4"/>
      <rect x="2" y="20.2" width="20" height="1.8"/>
    </svg>`;

  /* --- Menu data (pour desktop + mobile) --- */
  const MENU = [
    { key:'apropos', label:"L'Université", href:'#apropos',
      items:[
        { href:'apropos.html', title:'Qui sommes-nous ?', desc:"Histoire, identité et vocation de l'institut.",
          icon:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
        { href:'mot-du-dg.html', title:'Mot du Directeur', desc:"Vision et engagement de la direction.",
          icon:'<path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M21 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>' },
        { href:'mission.html', title:'Notre mission', desc:"Objectifs, engagements et priorités stratégiques.",
          icon:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>' },
        { href:'equipe.html', title:'Notre équipe', desc:"Direction, pôles et encadrement pédagogique.",
          icon:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' },
        { href:'valeurs.html', title:'Nos valeurs', desc:"Excellence, rigueur, pratique et proximité.",
          icon:'<path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z"/>' }
      ]},
    { key:'services', label:'Formations', href:'#secteurs',
      items:[
        { href:'gestion-finance.html', title:'Gestion, Commerce & Finance', desc:"Comptabilité, audit, banque, marketing.",
          icon:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' },
        { href:'informatique-digital.html', title:'Informatique & Numérique', desc:"Dev web, réseaux, data, cybersécurité.",
          icon:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
        { href:'genie-civil.html', title:'Génie civil & Industriel', desc:"BTP, génie électrique et mécanique.",
          icon:'<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="9"/>' },
        { href:'sante-sciences.html', title:'Santé & Sciences de la Vie', desc:"Soins, biologie, pharmacie, santé publique.",
          icon:'<path d="M22 12h-4l-3 9-6-18-3 9H2"/>' },
        { href:'communication-marketing.html', title:'Communication & Marketing', desc:"Journalisme, marketing digital, médias.",
          icon:'<path d="M3 11v3a1 1 0 0 0 1 1h3l5 4V7L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a5 5 0 0 1 0 8"/>' },
        { href:'droit-sciences-sociales.html', title:'Droit, RH & Sciences Sociales', desc:"Droit des affaires, RH, gestion publique.",
          icon:'<path d="M12 3v18M3 6h18M6 6l-3 8a4 4 0 0 0 6 0zM18 6l-3 8a4 4 0 0 0 6 0z"/>' }
      ]},
    { key:'projets', label:'Programmes', href:'#projets',
      items:[
        { href:'licence-pro.html', title:'Licence Professionnelle', desc:"Bac +3, formation initiale ou alternance.",
          icon:'<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>' },
        { href:'master-pro.html', title:'Master Professionnel', desc:"Bac +5, expertise et recherche appliquée.",
          icon:'<path d="M2 7l10 6 10-6-10-6L2 7z"/><path d="M6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6"/><path d="M22 7v8"/>' },
        { href:'bts-dut.html', title:'BTS & DUT', desc:"Parcours courts de 2 ans, opérationnels.",
          icon:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12l2 2 4-4"/>' },
        { href:'formation-continue.html', title:'Formation Continue', desc:"Modules courts pour professionnels en activité.",
          icon:'<path d="M4 19V5a2 2 0 0 1 2-2h13v16"/><path d="M20 22H6a2 2 0 0 1 0-4h14z"/>' },
        { href:'certifications.html', title:'Certifications', desc:"Diplômes reconnus et validés par examens.",
          icon:'<circle cx="12" cy="8" r="6"/><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5"/>' }
      ]},
    { key:'vision', label:'Vision 2030', href:'#objectif',
      items:[
        { href:'vision-2030.html', title:'Notre vision', desc:"Devenir une référence africaine en 2030.",
          icon:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' },
        { href:'objectifs-strategiques.html', title:'Objectifs stratégiques', desc:"20 000 étudiants, 100% accrédités.",
          icon:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>' },
        { href:'accreditations.html', title:'Accréditations', desc:"Reconnaissance nationale et internationale.",
          icon:'<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>' }
      ]},
    { key:'medias', label:'Actualités', href:'#actus',
      items:[
        { href:'actualites.html', title:'Actualités', desc:"Toute l'actualité de l'institut.",
          icon:'<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>' },
        { href:'evenements.html', title:'Événements', desc:"Forums, conférences et rentrées.",
          icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
        { href:'videographie.html', title:'Vidéographie', desc:"La vie du campus en vidéo.",
          icon:'<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>' },
        { href:'publications.html', title:'Publications', desc:"Brochures, guides et rapports.",
          icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>' }
      ]},
    { key:'contact', label:'Contact', href:'#contact',
      items:[
        { href:'contact.html', title:'Nous contacter', desc:"Formulaire, coordonnées et horaires.",
          icon:'<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
        { href:'admissions.html', title:'Admissions', desc:"Conditions, dossier et calendrier.",
          icon:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>' },
        { href:'campus.html', title:'Le campus', desc:"Visite, équipements et accès.",
          icon:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' }
      ]}
  ];

  /* --- Construction du HTML des menus --- */
  const desktopItems = MENU.map(m => {
    const active = currentGroup === m.key ? ' active' : '';
    const items = m.items.map(it => `
      <li><a href="${pageRoot}${it.href}">
        <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg></span>
        <span class="dd-txt"><b>${it.title}</b><span>${it.desc}</span></span>
      </a></li>`).join('');
    return `
      <li class="nav-item${active}">
        <a href="${isSubpage ? root + 'index.html' : ''}${m.href}">${m.label}
          <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </a>
        <div class="dropdown-panel"><div class="dropdown-inner"><ul>${items}</ul></div></div>
      </li>`;
  }).join('');

  const mobileItems = MENU.map((m, idx) => {
    const items = m.items.map(it =>
      `<a href="${pageRoot}${it.href}">${it.title}</a>`).join('');
    return `
      <button class="mobile-dropdown-btn" data-target="mob-${idx}">${m.label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="mobile-submenu" id="mob-${idx}">${items}</div>`;
  }).join('');

  /* --- HEADER --- */
  const headerHTML = `
    <header id="hd">
      <div class="wrap bar">
        <a href="${isSubpage ? root + 'index.html' : '#accueil'}" class="logo" aria-label="ISTP – Accueil">
          <span class="mark">${LOGO_SVG}</span>
          <span>ISTP<small>Institut Professionnel</small></span>
        </a>
        <button class="burger" id="bg" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>
        <nav class="desktop-nav" aria-label="Navigation principale">
          <ul>${desktopItems}</ul>
        </nav>
        <a href="${pageRoot}contact.html" class="btn gold btn-header">S'inscrire</a>
      </div>
      <div id="mobileMenu" class="mobile-menu" aria-label="Menu mobile">
        <a href="${isSubpage ? root + 'index.html' : '#accueil'}">Accueil</a>
        ${mobileItems}
      </div>
    </header>`;

  /* --- FOOTER --- */
  const footerHTML = `
    <footer>
      <div class="wrap">
        <div class="grid">
          <div>
            <div class="brand">
              <span class="mark">${LOGO_SVG}</span>
              <b>ISTP<small>Université Professionnelle du Sénégal</small></b>
            </div>
            <p style="color:#8ba0c0;font-size:.88rem;line-height:1.7;max-width:340px">Au service de la réussite des talents depuis 2001. Sous la tutelle du Ministère de l'Enseignement Supérieur, de la Recherche et de l'Innovation.</p>
          </div>
          <div>
            <h4>L'Université</h4>
            <ul>
              <li><a href="${pageRoot}apropos.html">Qui sommes-nous ?</a></li>
              <li><a href="${pageRoot}mot-du-dg.html">Mot du Directeur</a></li>
              <li><a href="${pageRoot}mission.html">Notre mission</a></li>
              <li><a href="${pageRoot}equipe.html">Notre équipe</a></li>
              <li><a href="${pageRoot}valeurs.html">Nos valeurs</a></li>
            </ul>
          </div>
          <div>
            <h4>Formations</h4>
            <ul>
              <li><a href="${pageRoot}gestion-finance.html">Gestion &amp; Finance</a></li>
              <li><a href="${pageRoot}informatique-digital.html">Informatique &amp; Digital</a></li>
              <li><a href="${pageRoot}genie-civil.html">Génie civil &amp; Industriel</a></li>
              <li><a href="${pageRoot}sante-sciences.html">Santé &amp; Sciences</a></li>
              <li><a href="${pageRoot}communication-marketing.html">Communication</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Avenue Cheikh Anta Diop, Dakar</li>
              <li>+221 33 869 55 04</li>
              <li>admissions@ISTP.sn</li>
              <li>Lun–Ven · 8h–18h</li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <span>© 2026 ISTP – Tous droits réservés</span>
          <span>
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Plan du site</a>
          </span>
        </div>
      </div>
    </footer>`;

  /* --- Injection --- */
  const hs = document.getElementById('arcons-header');
  const fs = document.getElementById('arcons-footer');
  if (hs) hs.innerHTML = headerHTML;
  if (fs) fs.innerHTML = footerHTML;

  /* --- Behaviors --- */
  const hd = document.getElementById('hd');
  const bg = document.getElementById('bg');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hd && bg) {
    const checkScroll = () => hd.classList.toggle('solid', scrollY > 40);
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    bg.onclick = () => {
      const open = mobileMenu.classList.toggle('open');
      hd.classList.toggle('menu-open', open);
      bg.setAttribute('aria-expanded', open);
      bg.textContent = open ? '✕' : '☰';
    };

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hd.classList.remove('menu-open');
        bg.textContent = '☰';
        bg.setAttribute('aria-expanded', 'false');
      });
    });

    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (!target) return;
        const open = target.classList.toggle('open');
        btn.classList.toggle('open', open);
      });
    });
  }

  /* --- Reveal animations (.rv) --- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.rv').forEach(e => io.observe(e));

  /* --- Formulaire contact --- */
  const fm = document.getElementById('fm');
  if (fm) {
    fm.addEventListener('submit', e => {
      e.preventDefault();
      const ok = document.getElementById('ok');
      if (ok) {
        ok.style.display = 'block';
        setTimeout(() => ok.style.display = 'none', 6000);
      }
      fm.reset();
    });
  }

  /* =====================================================================
     EFFET MACHINE À ÉCRIRE SUR LES TITRES DE PAGE
     Version corrigée : réserve la hauteur réelle du titre pour empêcher
     tout décalage des éléments environnants pendant la frappe.
     ===================================================================== */
  function typeEffect(el, speed, delay) {
    if (!el || el.dataset.typed === 'true') return;
    el.dataset.typed = 'true';

    const originalHTML = el.innerHTML;
    const text = el.textContent.trim();
    if (!text) return;

    // 1) Clone invisible qui réserve la hauteur finale du titre
    const phantom = document.createElement('span');
    phantom.innerHTML = originalHTML;
    phantom.style.cssText = 'visibility:hidden;display:block;height:auto;pointer-events:none';
    phantom.setAttribute('aria-hidden', 'true');

    // 2) Prépare le conteneur
    el.innerHTML = '';
    el.style.position = 'relative';
    el.style.display = 'block';

    // 3) Conteneur du texte tapé, superposé au phantom
    const typed = document.createElement('span');
    typed.className = 'type typing';
    typed.style.cssText = 'display:block;position:absolute;top:0;left:0;right:0';

    el.appendChild(phantom);
    el.appendChild(typed);

    let i = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          typed.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          typed.classList.remove('typing');
          typed.classList.add('done');
          // 4) Restaure proprement le HTML original
          setTimeout(() => {
            el.innerHTML = originalHTML;
            el.classList.remove('type', 'done');
            el.style.position = '';
            el.style.display = '';
          }, 400);
        }
      }, speed);
    }, delay);
  }

  // Applique l'effet à tous les h1 de la page-hero (pages internes)
  document.querySelectorAll('.page-hero h1').forEach((h1, i) => {
    typeEffect(h1, 45, 300 + i * 200);
  });

  // Pour la page d'accueil : chaque slide a son propre h1, on les tape
  // à l'activation du slide via un MutationObserver
  const slides = document.querySelectorAll('.hero .slide');
  if (slides.length) {
    const typedSlides = new WeakSet();

    // Première slide (déjà active au chargement)
    const firstActive = document.querySelector('.hero .slide.on');
    if (firstActive) {
      typedSlides.add(firstActive);
      const h1 = firstActive.querySelector('.cap h1');
      if (h1) setTimeout(() => typeEffect(h1, 40, 900), 100);
    }

    const slideObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        const el = m.target;
        if (el.classList.contains('on') && !typedSlides.has(el)) {
          typedSlides.add(el);
          const h1 = el.querySelector('.cap h1');
          if (h1) {
            h1.dataset.typed = 'false';
            setTimeout(() => typeEffect(h1, 40, 400), 100);
          }
        }
      });
    });

    slides.forEach(s => slideObserver.observe(s, { attributes: true, attributeFilter: ['class'] }));
  }
})();
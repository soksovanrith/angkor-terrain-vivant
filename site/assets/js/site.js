/* Angkor Terrain Vivant - site behaviour
   Progressive enhancement only. Everything readable with JS disabled. */
(function () {
  'use strict';

  /* ---------------------------------------------------------- language */
  var STORE_KEY = 'atv-lang';
  var SUPPORTED = ['fr', 'en'];

  function readStored() {
    try {
      var v = window.localStorage.getItem(STORE_KEY);
      return SUPPORTED.indexOf(v) > -1 ? v : null;
    } catch (e) { return null; }
  }

  function writeStored(lang) {
    try { window.localStorage.setItem(STORE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function detectLang() {
    var stored = readStored();
    if (stored) return stored;
    var nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return nav === 'fr' ? 'fr' : 'en';
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    var blocks = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].hidden = blocks[i].getAttribute('data-lang') !== lang;
    }
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute('aria-pressed',
        String(buttons[j].getAttribute('data-set-lang') === lang));
    }
    // attributes cannot hold two languages, so swap them here
    var attrs = document.querySelectorAll('[data-ph-fr]');
    for (var k = 0; k < attrs.length; k++) {
      attrs[k].placeholder = attrs[k].getAttribute('data-ph-' + lang)
        || attrs[k].getAttribute('data-ph-fr');
    }
    document.dispatchEvent(new CustomEvent('atv:lang', { detail: { lang: lang } }));
  }

  function initLang() {
    if (!document.querySelector('[data-lang]')) return;
    applyLang(detectLang());
    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-set-lang]');
      if (!btn) return;
      var lang = btn.getAttribute('data-set-lang');
      writeStored(lang);
      applyLang(lang);
    });
  }

  /* ---------------------------------------------------------- nav */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------- carousel */
  function initCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;
    var track = root.querySelector('.carousel-track');
    var slides = root.querySelectorAll('.carousel-slide');
    var dotsWrap = root.querySelector('.carousel-dots');
    var total = slides.length;
    if (!track || !total) return;

    var index = 0;
    var timer = null;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var dots = [];
    if (dotsWrap) {
      for (var i = 0; i < total; i++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.setAttribute('data-goto', String(i));
        d.setAttribute('aria-label', 'Slide ' + (i + 1) + ' / ' + total);
        dotsWrap.appendChild(d);
        dots.push(d);
      }
    }

    function show(n) {
      index = (n + total) % total;
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      for (var k = 0; k < total; k++) {
        slides[k].setAttribute('aria-hidden', String(k !== index));
        if (dots[k]) dots[k].setAttribute('aria-current', String(k === index));
      }
    }

    function start() {
      if (reduced) return;
      stop();
      timer = window.setInterval(function () { show(index + 1); }, 6000);
    }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    root.addEventListener('click', function (ev) {
      var goto = ev.target.closest('[data-goto]');
      var step = ev.target.closest('[data-step]');
      if (goto) { show(parseInt(goto.getAttribute('data-goto'), 10)); start(); }
      if (step) { show(index + parseInt(step.getAttribute('data-step'), 10)); start(); }
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);

    // touch swipe
    var x0 = null;
    root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      x0 = null;
      start();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    show(0);
    start();
  }

  /* ---------------------------------------------------------- filters */
  function initFilters() {
    var grid = document.getElementById('destination-grid');
    if (!grid) return;
    var search = document.getElementById('destination-search');
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = grid.querySelectorAll('.card');
    var empty = document.getElementById('destination-empty');
    var active = 'all';

    function run() {
      var q = search ? search.value.toLowerCase().trim() : '';
      var shown = 0;
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var keys = (card.getAttribute('data-keywords') || '').toLowerCase();
        var cat = card.getAttribute('data-category');
        var hit = (q === '' || keys.indexOf(q) > -1) && (active === 'all' || cat === active);
        card.hidden = !hit;
        if (hit) shown++;
      }
      if (empty) empty.hidden = shown !== 0;
    }

    if (search) search.addEventListener('input', run);
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].addEventListener('click', function (ev) {
        active = ev.currentTarget.getAttribute('data-filter');
        for (var k = 0; k < buttons.length; k++) {
          buttons[k].setAttribute('aria-pressed', String(buttons[k] === ev.currentTarget));
        }
        run();
      });
    }
    run();
  }

  /* ---------------------------------------------------------- booking */
  var WHATSAPP = '85512241787';

  var TOUR_LABEL = {
    'angkor-1j': 'Angkor Wat en 1 journée / Angkor Wat in 1 day',
    'siem-reap-2j': 'Siem Reap, 2 jours / 2 days',
    'siem-reap-3j': 'Siem Reap, 3 jours / 3 days',
    'nord-mekong-4j': 'Nord et Mékong, 4 jours / North and Mekong, 4 days',
    'grand-tour-8j': 'Grand Tour, 8 jours / 8 days',
    'phnom-penh': 'Phnom Penh, journée en ville / city day',
    'sur-mesure': 'Circuit sur mesure / Tailor made'
  };

  function fieldValue(form, name) {
    var el = form.elements[name];
    if (!el) return '';
    if (el.tagName === 'SELECT') {
      var opt = el.options[el.selectedIndex];
      return TOUR_LABEL[el.value] || (opt ? opt.text : el.value);
    }
    return (el.value || '').trim();
  }

  function buildSummary(form) {
    return {
      name: fieldValue(form, 'fullname'),
      email: fieldValue(form, 'email'),
      phone: fieldValue(form, 'phone'),
      tour: fieldValue(form, 'tour'),
      date: fieldValue(form, 'traveldate'),
      people: fieldValue(form, 'travelers'),
      notes: fieldValue(form, 'requests')
    };
  }

  function buildMessage(s) {
    var lines = [
      'Demande de réservation / Tour request',
      'Angkor Terrain Vivant',
      '',
      'Nom / Name: ' + s.name,
      'Email: ' + s.email,
      'Tél / Phone: ' + s.phone,
      'Circuit / Tour: ' + s.tour,
      'Date: ' + s.date,
      'Voyageurs / Travellers: ' + s.people
    ];
    if (s.notes) { lines.push('Notes: ' + s.notes); }
    return lines.join('\n');
  }

  function initBookingForm() {
    var form = document.getElementById('booking-form');
    if (!form) return;

    var dateField = form.elements.traveldate;
    if (dateField && !dateField.min) {
      dateField.min = new Date().toISOString().slice(0, 10);
    }

    // deep link from the itineraries page: reserver.html?tour=grand-tour-8j
    var wanted = new URLSearchParams(window.location.search).get('tour');
    if (wanted && form.elements.tour) {
      var sel = form.elements.tour;
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === wanted) { sel.selectedIndex = i; break; }
      }
    }

    form.addEventListener('submit', function (ev) {
      if (!form.reportValidity()) { ev.preventDefault(); return; }
      ev.preventDefault();

      var s = buildSummary(form);
      var msg = buildMessage(s);
      var params = new URLSearchParams({
        name: s.name, tour: s.tour, date: s.date,
        people: s.people, email: s.email
      });

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener');
      window.location.href = 'confirmation.html?' + params.toString();
    });
  }

  function initConfirmation() {
    var receipt = document.getElementById('receipt');
    if (!receipt) return;
    var p = new URLSearchParams(window.location.search);
    var map = {
      'r-name': 'name', 'r-tour': 'tour', 'r-date': 'date',
      'r-people': 'people', 'r-email': 'email'
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      var v = p.get(map[id]);
      if (el && v) el.textContent = v;
    });

    var ref = document.getElementById('r-ref');
    if (ref) {
      var seed = (p.get('date') || '') + (p.get('name') || '') + Date.now();
      var h = 0;
      for (var i = 0; i < seed.length; i++) { h = (h * 31 + seed.charCodeAt(i)) >>> 0; }
      ref.textContent = 'ATV-' + String(h % 100000).padStart(5, '0');
    }

    var wa = document.getElementById('r-whatsapp');
    if (wa) {
      wa.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(
        'Bonjour, je viens d\'envoyer une demande de réservation pour : '
        + (p.get('tour') || '') + ', le ' + (p.get('date') || '') + '.');
    }
  }

  /* ---------------------------------------------------------- year */
  function initYear() {
    var els = document.querySelectorAll('[data-year]');
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = String(new Date().getFullYear());
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initNav();
    initCarousel();
    initFilters();
    initBookingForm();
    initConfirmation();
    initYear();
  });
})();

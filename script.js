/* ============================================================
   AMSON — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Banner ---------- */
  const banner = document.getElementById('banner');
  const bannerClose = document.getElementById('bannerClose');
  const nav = document.getElementById('nav');

  if (bannerClose) {
    bannerClose.addEventListener('click', () => {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(-100%)';
      banner.style.transition = 'opacity 0.3s, transform 0.3s';
      setTimeout(() => {
        banner.remove();
        nav.classList.add('banner-gone');
      }, 320);
    });
  }

  /* ---------- Hamburger ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  /* ---------- Smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Interactive Hero Demo ---------- */
  const chips = document.querySelectorAll('.demo-chip');
  const dsbTicker  = document.getElementById('dsbTicker');
  const dsbSignal  = document.getElementById('dsbSignal');
  const dsbPrice   = document.getElementById('dsbPrice');
  const dbdTrend   = document.getElementById('dbdTrend');
  const dbdTiming  = document.getElementById('dbdTiming');
  const dbdMomentum= document.getElementById('dbdMomentum');
  const demoCandles= document.getElementById('demoCandles');
  const signalBox  = document.getElementById('demoSignalBox');

  const candlePatterns = {
    BUY:  [28,38,45,35,52,60,70,80],
    SELL: [80,70,60,55,45,38,30,22],
    WAIT: [50,55,45,58,48,52,46,54],
  };

  function setSignalClass(el, signal, prefix) {
    el.classList.remove(`${prefix}buy`, `${prefix}sell`, `${prefix}wait`);
    el.classList.add(`${prefix}${signal.toLowerCase()}`);
  }

  function updateDemo(chip) {
    const { ticker, signal, price, trend, timing, momentum } = chip.dataset;

    // Fade out
    signalBox.classList.add('animating');

    setTimeout(() => {
      dsbTicker.textContent = ticker;
      dsbSignal.textContent = signal;
      dsbPrice.textContent  = price;
      dbdTrend.textContent  = trend;
      dbdTiming.textContent = timing;
      dbdMomentum.textContent = momentum + ' in control';

      // Color the signal
      setSignalClass(dsbSignal, signal, 'sig-');

      // Color breakdown values
      const cls = signal === 'BUY' ? 'val-buy' : signal === 'SELL' ? 'val-sell' : 'val-wait';
      [dbdTrend, dbdTiming, dbdMomentum].forEach(el => {
        el.className = 'dbd-val ' + cls;
      });

      // Rebuild candles
      const heights = candlePatterns[signal];
      const candles = demoCandles.querySelectorAll('.dc');
      candles.forEach((c, i) => {
        c.style.setProperty('--h', heights[i] + '%');
        c.className = 'dc ' + (signal === 'BUY' ? 'bull' : signal === 'SELL' ? 'bear' : 'flat');
      });

      // Fade back in
      signalBox.classList.remove('animating');
    }, 200);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      updateDemo(chip);
    });
  });

  // Init with first chip
  if (chips.length) updateDemo(chips[0]);


  const stocks = [
    { sym: 'AAPL',  sig: 'BUY',  cls: 'buy' },
    { sym: 'NVDA',  sig: 'SELL', cls: 'sell' },
    { sym: 'TSLA',  sig: 'WAIT', cls: 'wait' },
    { sym: 'MSFT',  sig: 'BUY',  cls: 'buy' },
    { sym: 'AMZN',  sig: 'BUY',  cls: 'buy' },
    { sym: 'META',  sig: 'SELL', cls: 'sell' },
    { sym: 'GOOG',  sig: 'WAIT', cls: 'wait' },
    { sym: 'PLTR',  sig: 'BUY',  cls: 'buy' },
    { sym: 'NFLX',  sig: 'SELL', cls: 'sell' },
    { sym: 'AMD',   sig: 'WAIT', cls: 'wait' },
  ];

  const track = document.getElementById('tickerTrack');
  if (track) {
    // Double for seamless loop
    [...stocks, ...stocks].forEach(s => {
      const chip = document.createElement('div');
      chip.className = 'tick-chip';
      chip.innerHTML = `<span class="tick-sym">${s.sym}</span><span class="tick-badge ${s.cls}">${s.sig}</span>`;
      track.appendChild(chip);
    });

    let pos = 0;
    const speed = 0.5;
    function scroll() {
      pos += speed;
      const half = track.scrollWidth / 2;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      requestAnimationFrame(scroll);
    }
    scroll();
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.sig-card, .feat-row, .faq-item, .safety-card, .how-step'
  );

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    io.observe(el);
  });

  /* ---------- Typewriter loop in step 01 mock card ---------- */
  const mcTyping = document.getElementById('mcTyping');
  if (mcTyping) {
    const words = ['NVDA', 'TSLA', 'MSFT', 'AAPL', 'AMZN', 'META', 'GOOG', 'PLTR'];
    let wIdx = 0, cIdx = 0, deleting = false;

    function typeLoop() {
      const word = words[wIdx];
      const display = word.slice(0, cIdx);
      mcTyping.innerHTML = display + '<span class="blink-cursor">|</span>';

      if (!deleting) {
        cIdx++;
        if (cIdx > word.length) {
          setTimeout(() => { deleting = true; typeLoop(); }, 1200);
          return;
        }
        setTimeout(typeLoop, 90);
      } else {
        cIdx--;
        if (cIdx < 0) {
          deleting = false;
          cIdx = 0;
          wIdx = (wIdx + 1) % words.length;
          setTimeout(typeLoop, 300);
          return;
        }
        setTimeout(typeLoop, 55);
      }
    }

    setTimeout(typeLoop, 800);
  }

});

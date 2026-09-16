/* ============================================================
   AMSON — script.js
   Animated Stock Radar Version
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     BANNER
     ========================================================== */

  const banner = document.getElementById("banner");
  const bannerClose = document.getElementById("bannerClose");

  if (banner && bannerClose) {
    bannerClose.addEventListener("click", () => {
      banner.style.opacity = "0";
      banner.style.transform = "translateY(-100%)";
      banner.style.transition =
        "opacity .3s ease, transform .3s ease";

      setTimeout(() => {
        banner.remove();
      }, 300);
    });
  }


  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      hamburger.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburger.classList.remove("active");
      });

    });
  }


  /* ==========================================================
     SMOOTH SCROLLING
     ========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const href = link.getAttribute("href");

        if (!href || href === "#") {
          return;
        }

        const target = document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* ==========================================================
     NAVIGATION SHADOW ON SCROLL
     ========================================================== */

  const nav = document.getElementById("nav");

  function updateNavigation() {

    if (!nav) {
      return;
    }

    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateNavigation);

  updateNavigation();


  /* ==========================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* ==========================================================
     MARKET INTELLIGENCE TICKER
     ========================================================== */

  const tickerTrack =
    document.getElementById("tickerTrack");

  const tickerStocks = [

    {
      symbol: "BRK.B",
      text: "14 buys"
    },

    {
      symbol: "AMD",
      text: "13 buys"
    },

    {
      symbol: "MSFT",
      text: "11 buys"
    },

    {
      symbol: "PLTR",
      text: "11 buys"
    },

    {
      symbol: "AMZN",
      text: "10 buys"
    },

    {
      symbol: "AAPL",
      text: "6 buys"
    },

    {
      symbol: "NVDA",
      text: "13F ↑"
    },

    {
      symbol: "META",
      text: "Insider"
    }

  ];


  if (tickerTrack) {

    /*
      Duplicate the stock list so the ticker
      can loop continuously without an obvious gap.
    */

    const tickerItems = [
      ...tickerStocks,
      ...tickerStocks
    ];


    tickerItems.forEach(stock => {

      const item =
        document.createElement("div");

      item.className = "ticker-chip";

      item.innerHTML = `
        ${stock.symbol}
        <span>${stock.text}</span>
      `;

      tickerTrack.appendChild(item);

    });


    let tickerPosition = 0;
    let tickerPaused = false;


    function animateTicker() {

      if (!tickerPaused) {

        tickerPosition += 0.35;

        const halfwayPoint =
          tickerTrack.scrollWidth / 2;

        if (
          halfwayPoint > 0 &&
          tickerPosition >= halfwayPoint
        ) {
          tickerPosition = 0;
        }

        tickerTrack.style.transform =
          `translateX(-${tickerPosition}px)`;

      }

      requestAnimationFrame(animateTicker);

    }


    tickerTrack.addEventListener(
      "mouseenter",
      () => {
        tickerPaused = true;
      }
    );


    tickerTrack.addEventListener(
      "mouseleave",
      () => {
        tickerPaused = false;
      }
    );


    animateTicker();

  }


  /* ==========================================================
     STOCK SIGNAL DEMO  ("TRY A STOCK")
     Enhanced with a real transition: the whole card dips and
     fades before the new values land, instead of an instant
     text swap, plus the confidence meter animates to its
     new position rather than jumping there.
     ========================================================== */

  const demoChips =
    document.querySelectorAll(".demo-chip");

  const demoTicker =
    document.getElementById("demoTicker");

  const demoCompany =
    document.getElementById("demoCompany");

  const demoSignal =
    document.getElementById("demoSignal");

  const demoPrice =
    document.getElementById("demoPrice");

  const demoChange =
    document.getElementById("demoChange");

  const demoScore =
    document.getElementById("demoScore");

  const demoMeter =
    document.getElementById("demoMeter");

  const signalDetailCard =
    document.getElementById("signalDetailCard");


  function applySignalValues(chip) {

    const ticker = chip.dataset.ticker;
    const company = chip.dataset.company;
    const signal = chip.dataset.signal;
    const price = chip.dataset.price;
    const change = chip.dataset.change;
    const score = chip.dataset.score;

    if (demoTicker) demoTicker.textContent = ticker;
    if (demoCompany) demoCompany.textContent = company;
    if (demoSignal) demoSignal.textContent = signal;
    if (demoPrice) demoPrice.textContent = price;
    if (demoChange) demoChange.textContent = change;

    if (demoScore) {
      demoScore.textContent = `HIGH CONFIDENCE · SCORE ${score}`;
    }

    if (demoSignal) {
      if (signal === "BUY") {
        demoSignal.style.color = "#128a47";
      } else if (signal === "SELL") {
        demoSignal.style.color = "#c91f2d";
      } else {
        demoSignal.style.color = "#53657e";
      }
    }

    if (demoChange) {
      if (change && change.startsWith("+")) {
        demoChange.style.color = "#128a47";
      } else {
        demoChange.style.color = "#c91f2d";
      }
    }

    if (demoMeter) {
      demoMeter.style.transition = "left .5s cubic-bezier(.22,.9,.32,1)";

      if (signal === "BUY") {
        demoMeter.style.left = "78%";
      } else if (signal === "SELL") {
        demoMeter.style.left = "22%";
      } else {
        demoMeter.style.left = "54%";
      }
    }
  }


  function updateSignalDemo(chip) {

    if (!chip) {
      return;
    }

    if (!signalDetailCard) {
      applySignalValues(chip);
      return;
    }

    // brief dip + fade so switching stocks reads as a
    // deliberate update, then values land as it settles back
    signalDetailCard.style.transition =
      "opacity .16s ease, transform .16s ease";
    signalDetailCard.style.opacity = "0.35";
    signalDetailCard.style.transform = "translateY(4px)";

    setTimeout(() => {
      applySignalValues(chip);
      signalDetailCard.style.opacity = "1";
      signalDetailCard.style.transform = "translateY(0)";
    }, 160);
  }


  demoChips.forEach(chip => {

    chip.addEventListener("click", () => {

      demoChips.forEach(item => {
        item.classList.remove("active");
      });

      chip.classList.add("active");

      updateSignalDemo(chip);

    });

  });


  /* ==========================================================
     FAQ ACCORDION
     ========================================================== */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach(item => {

    const button =
      item.querySelector(".faq-q");

    if (!button) {
      return;
    }


    button.addEventListener("click", () => {

      const alreadyOpen =
        item.classList.contains("open");


      /*
        Close all FAQ questions first.
      */

      faqItems.forEach(otherItem => {
        otherItem.classList.remove("open");
      });


      /*
        If the clicked question wasn't already
        open, open it.
      */

      if (!alreadyOpen) {
        item.classList.add("open");
      }

    });

  });


  /* ==========================================================
     TODAY'S OVERVIEW — Political / Institutional / Insider
     Clicking a tab swaps the leaderboard's title and rows,
     with the rank bars animating in from 0% width so each
     switch feels alive rather than a flat content swap.
     ========================================================== */

  const MOVERS_DATA = {
    political: {
      title: "Most Political buying",
      topSymbol: "BRK.B",
      topStat: "14 congressional buys in the last 180 days",
      rows: [
        { symbol: "BRK.B", pct: 100, stat: "14 buys" },
        { symbol: "AMD",   pct: 93,  stat: "13 buys" },
        { symbol: "T",     pct: 86,  stat: "12 buys" },
        { symbol: "MSFT",  pct: 79,  stat: "11 buys" },
        { symbol: "PLTR",  pct: 79,  stat: "11 buys" }
      ]
    },
    institutional: {
      title: "Most Institutional buying",
      topSymbol: "MU",
      topStat: "+$62.7M in net institutional buying",
      rows: [
        { symbol: "MU",   pct: 100, stat: "+$62.7M" },
        { symbol: "SPYM", pct: 73,  stat: "+$46.0M" },
        { symbol: "VOO",  pct: 73,  stat: "+$45.5M" },
        { symbol: "APH",  pct: 65,  stat: "+$41.0M" },
        { symbol: "IVV",  pct: 63,  stat: "+$39.7M" }
      ]
    },
    insider: {
      title: "Most Insider buying",
      topSymbol: "RSG",
      topStat: "+$283.8M in net insider buying",
      rows: [
        { symbol: "RSG",  pct: 100, stat: "+$283.8M" },
        { symbol: "SUJA", pct: 9,   stat: "+$24.4M" },
        { symbol: "GWRS", pct: 2,   stat: "+$5.8M" },
        { symbol: "AMR",  pct: 1,   stat: "+$3.9M" },
        { symbol: "GME",  pct: 1,   stat: "+$0.6M" }
      ]
    }
  };

  const moversTabs = document.querySelectorAll("#moversTabs button");
  const leaderboardTitle = document.getElementById("leaderboardTitle");
  const leaderboardRows = document.getElementById("leaderboardRows");
  const topMoverSymbol = document.getElementById("topMoverSymbol");
  const topMoverStat = document.getElementById("topMoverStat");
  const moversLeaderboard = document.getElementById("moversLeaderboard");

  function renderLeaderboardRows(rows) {
    leaderboardRows.innerHTML = "";

    rows.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "rank";
      row.innerHTML = `
        <span>${i + 1}</span>
        <div>
          <b>${r.symbol}</b>
          <i><u style="width:0%"></u></i>
        </div>
        <strong>${r.stat}</strong>
      `;
      leaderboardRows.appendChild(row);
    });

    // animate bars growing to their real width right after
    // they're painted at 0%, instead of appearing pre-filled
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const bars = leaderboardRows.querySelectorAll(".rank i u");
        bars.forEach((bar, i) => {
          bar.style.transition = `width .5s ease ${i * 0.05}s`;
          bar.style.width = rows[i].pct + "%";
        });
      });
    });
  }

  function setMoversCategory(category) {
    const data = MOVERS_DATA[category];
    if (!data || !leaderboardTitle) return;

    moversTabs.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });

    moversLeaderboard.style.transition = "opacity .18s ease";
    moversLeaderboard.style.opacity = "0";

    setTimeout(() => {
      leaderboardTitle.textContent = data.title;
      if (topMoverSymbol) {
        topMoverSymbol.childNodes[0].nodeValue = data.topSymbol + " ";
      }
      if (topMoverStat) topMoverStat.textContent = data.topStat;
      renderLeaderboardRows(data.rows);
      moversLeaderboard.style.opacity = "1";
    }, 180);
  }

  if (moversTabs.length && leaderboardRows) {
    moversTabs.forEach(btn => {
      btn.addEventListener("click", () => {
        setMoversCategory(btn.dataset.category);
      });
    });

    // initial paint (political, matching the static markup default)
    renderLeaderboardRows(MOVERS_DATA.political.rows);
  }


  /* ==========================================================
     WATCHLIST — Stocks / Congress toggle
     Congress rows use generic role labels only ("A
     Representative" / "A Senator") rather than any specific
     name, real or invented, since even a fictional-sounding
     name could coincidentally match a real member of Congress.
     ========================================================== */

  const WATCHLIST_DATA = {
    stocks: {
      headTitle: "Watchlist",
      headSub: "2 stocks · alerts active",
      note: "Monitoring 2 stocks — you'll be notified at market close on BUY or SELL signals.",
      rows: [
        { avatar: "M", name: "MMM", sub: "Tap to analyze · alerts active" },
        { avatar: "A", name: "AAOI", sub: "Tap to analyze · alerts active" }
      ]
    },
    congress: {
      headTitle: "Watchlist",
      headSub: "2 people followed · alerts active",
      note: "Following 2 people — you'll be notified when their disclosed holdings change.",
      rows: [
        { avatar: "R", name: "A Representative", sub: "New trade disclosed · House" },
        { avatar: "S", name: "A Senator", sub: "New trade disclosed · Senate" }
      ]
    }
  };

  const watchlistToggle = document.getElementById("watchlistToggle");
  const watchlistCard = document.getElementById("watchlistCard");
  const watchlistHeadTitle = document.getElementById("watchlistHeadTitle");
  const watchlistHeadSub = document.getElementById("watchlistHeadSub");
  const watchlistNote = document.getElementById("watchlistNote");
  const watchlistRows = document.getElementById("watchlistRows");

  function renderWatchlistRows(rows) {
    watchlistRows.innerHTML = "";

    rows.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "watch-row";
      row.style.opacity = "0";
      row.style.transform = "translateY(6px)";
      row.style.transition = `opacity .3s ease ${i * 0.08}s, transform .3s ease ${i * 0.08}s`;
      row.innerHTML = `
        <span>${r.avatar}</span>
        <div>
          <b>${r.name}</b>
          <small>${r.sub}</small>
        </div>
        <i></i>
        <em>›</em>
      `;
      watchlistRows.appendChild(row);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          row.style.opacity = "1";
          row.style.transform = "translateY(0)";
        });
      });
    });
  }

  function setWatchlistView(view) {
    const data = WATCHLIST_DATA[view];
    if (!data || !watchlistCard) return;

    const toggleButtons = watchlistToggle.querySelectorAll("button");
    toggleButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === view);
    });

    watchlistCard.style.transition = "opacity .16s ease";
    watchlistCard.style.opacity = "0.4";

    setTimeout(() => {
      if (watchlistHeadTitle) watchlistHeadTitle.textContent = data.headTitle;
      if (watchlistHeadSub) watchlistHeadSub.textContent = data.headSub;
      if (watchlistNote) {
        watchlistNote.innerHTML = `<i></i>${data.note}`;
      }
      renderWatchlistRows(data.rows);
      watchlistCard.style.opacity = "1";
    }, 160);
  }

  if (watchlistToggle && watchlistRows) {
    watchlistToggle.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        setWatchlistView(btn.dataset.view);
      });
    });

    // initial paint (stocks, matching the static markup default)
    renderWatchlistRows(WATCHLIST_DATA.stocks.rows);
  }


  /* ==========================================================
     ANIMATED STOCK RADAR
     ========================================================== */

  const radar =
    document.getElementById("stockRadar");

  const radarStocks =
    Array.from(
      document.querySelectorAll(
        ".radar-stock"
      )
    );

  const scanText =
    document.getElementById("scanText");

  const scanCount =
    document.getElementById("scanCount");


  let radarIndex = 0;

  let radarInterval = null;

  let radarPaused = false;


  /* ==========================================================
     ACTIVATE A STOCK ON THE RADAR
     ========================================================== */

  function activateRadarStock(index) {

    if (!radarStocks.length) {
      return;
    }


    /*
      Remove highlight from all stocks.
    */

    radarStocks.forEach(stock => {
      stock.classList.remove("is-active");
    });


    /*
      Select the next stock.
    */

    const selectedStock =
      radarStocks[
        index % radarStocks.length
      ];


    selectedStock.classList.add(
      "is-active"
    );


    const symbol =
      selectedStock.dataset.symbol;

    const price =
      selectedStock.dataset.price;

    const change =
      selectedStock.dataset.change;


    /*
      Update the text below the radar.
    */

    if (scanText) {

      scanText.textContent =
        `${symbol} ${price} · ${change} · tracking political, institutional and insider activity`;

    }

  }


  /* ==========================================================
     AUTOMATIC RADAR STOCK CYCLE
     ========================================================== */

  function startRadarCycle() {

    if (!radarStocks.length) {
      return;
    }


    /*
      Prevent multiple intervals from
      accidentally running.
    */

    if (radarInterval) {
      clearInterval(radarInterval);
    }


    radarInterval =
      setInterval(() => {

        if (radarPaused) {
          return;
        }


        radarIndex =
          (radarIndex + 1) %
          radarStocks.length;


        activateRadarStock(
          radarIndex
        );

      }, 2400);

  }


  /* ==========================================================
     RADAR STOCK HOVER + CLICK
     ========================================================== */

  radarStocks.forEach(
    (stock, index) => {


      /* Mouse enters stock */

      stock.addEventListener(
        "mouseenter",
        () => {

          radarPaused = true;

          radarIndex = index;

          activateRadarStock(index);

        }
      );


      /* Mouse leaves stock */

      stock.addEventListener(
        "mouseleave",
        () => {

          radarPaused = false;

        }
      );


      /* Keyboard focus */

      stock.addEventListener(
        "focus",
        () => {

          radarPaused = true;

          radarIndex = index;

          activateRadarStock(index);

        }
      );


      /* Keyboard focus leaves */

      stock.addEventListener(
        "blur",
        () => {

          radarPaused = false;

        }
      );


      /* Click */

      stock.addEventListener(
        "click",
        () => {

          radarIndex = index;

          activateRadarStock(index);

        }
      );

    }
  );


  /* ==========================================================
     PAUSE RADAR WHEN HOVERING OVER IT
     ========================================================== */

  if (radar) {

    radar.addEventListener(
      "mouseenter",
      () => {

        radarPaused = true;

      }
    );


    radar.addEventListener(
      "mouseleave",
      () => {

        radarPaused = false;

      }
    );

  }


  /* ==========================================================
     START RADAR
     ========================================================== */

  if (radarStocks.length) {

    /*
      Start with NVDA highlighted.
    */

    activateRadarStock(0);

    startRadarCycle();

  }


  /* ==========================================================
     LIVE SCANNING COUNTER
     ========================================================== */

  if (scanCount) {

    const scanCounts = [

      "5,000+",
      "5,184",
      "5,327",
      "5,412",
      "5,506",
      "5,638",
      "5,741"

    ];


    let scanIndex = 0;


    setInterval(() => {

      scanIndex =
        (scanIndex + 1) %
        scanCounts.length;


      /*
        Fade the number out.
      */

      scanCount.style.opacity = "0";


      /*
        Change number and fade it back in.
      */

      setTimeout(() => {

        scanCount.textContent =
          scanCounts[scanIndex];

        scanCount.style.opacity = "1";

      }, 180);


    }, 3200);

  }


  /* ==========================================================
     RANDOM RADAR MICRO-BLIP ACTIVITY
     ========================================================== */

  const microBlips =
    document.querySelectorAll(
      ".micro-blip"
    );


  function randomizeBlips() {

    microBlips.forEach(blip => {

      /*
        Randomly choose some radar points
        to briefly glow larger.
      */

      if (Math.random() > 0.65) {

        blip.style.transform =
          "scale(1.8)";

        blip.style.opacity =
          "1";


        setTimeout(() => {

          blip.style.transform = "";

          blip.style.opacity = "";

        }, 450);

      }

    });

  }


  if (microBlips.length) {

    setInterval(
      randomizeBlips,
      1300
    );

  }


  /* ==========================================================
     RADAR STOCK CARD ENTRANCE
     ========================================================== */

  radarStocks.forEach(
    (stock, index) => {

      /*
        Begin invisible.
      */

      stock.style.opacity = "0";


      stock.style.transition =
        "opacity .5s ease, " +
        "transform .35s ease, " +
        "box-shadow .35s ease";


      /*
        Reveal each stock one after another.
      */

      setTimeout(() => {

        stock.style.opacity = "1";

      }, 400 + index * 130);

    }
  );


  /* ==========================================================
     RADAR CENTER PULSE
     ========================================================== */

  const radarCenter =
    document.querySelector(".radar-center");


  if (radarCenter) {

    /*
      Add a class periodically so the
      center point feels like a scanner.
    */

    setInterval(() => {

      radarCenter.classList.add(
        "pulse"
      );


      setTimeout(() => {

        radarCenter.classList.remove(
          "pulse"
        );

      }, 700);

    }, 2200);

  }


  /* ==========================================================
     RANDOM SCAN MESSAGE
     ========================================================== */

  const scanMessages = [

    "Tracking congressional, institutional and insider activity",

    "Analyzing institutional position changes",

    "Reviewing congressional trading activity",

    "Scanning insider transactions",

    "Comparing analyst forecasts",

    "Monitoring unusual market activity"

  ];


  let messageIndex = 0;


  /*
    Only rotate the general scanning text
    when the user isn't interacting with
    a specific radar stock.
  */

  if (scanText) {

    setInterval(() => {

      if (radarPaused) {
        return;
      }


      messageIndex =
        (messageIndex + 1) %
        scanMessages.length;


      /*
        Do not constantly overwrite the
        selected stock text. We update the
        generic message occasionally.
      */

      if (Math.random() > 0.45) {

        scanText.style.opacity = "0";


        setTimeout(() => {

          scanText.textContent =
            scanMessages[
              messageIndex
            ];

          scanText.style.opacity =
            "1";

        }, 180);

      }

    }, 5000);

  }


  /* ==========================================================
     BUTTON PRESS EFFECT
     ========================================================== */

  const interactiveButtons =
    document.querySelectorAll(
      ".primary-btn, .nav-download, .white-btn"
    );


  interactiveButtons.forEach(button => {

    button.addEventListener(
      "mousedown",
      () => {

        button.style.transform =
          "translateY(1px) scale(.99)";

      }
    );


    button.addEventListener(
      "mouseup",
      () => {

        button.style.transform = "";

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform = "";

      }
    );

  });


  /* ==========================================================
     RESPECT REDUCED MOTION
     ========================================================== */

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (reduceMotion.matches) {

    /*
      Stop automatic stock cycling.
    */

    if (radarInterval) {
      clearInterval(radarInterval);
    }


    /*
      Immediately reveal elements.
    */

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* ==========================================================
     INITIALIZE SIGNAL DEMO
     ========================================================== */

  const initialDemoChip =
    document.querySelector(
      ".demo-chip.active"
    );


  if (initialDemoChip) {

    applySignalValues(
      initialDemoChip
    );

  }


  /* ==========================================================
     END
     ========================================================== */

});


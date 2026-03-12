document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      this.setAttribute("aria-expanded", "true");
      searchInput.focus();
    });
  }

  if (searchClose && searchBar && searchInput) {
    searchClose.addEventListener("click", function () {
      searchBar.style.visibility = "hidden";
      searchBar.classList.remove("open");
      this.setAttribute("aria-expanded", "false");
    });
  }

  // --- custom carousel ---
  (function () {
    const hero = document.querySelector(".hero-image");
    if (!hero) return;
    const base = "/img/";
    const slides = [
      "hero1.png",
      "hero2.png",
      "hero3.png",
      "hero4.png",
      "hero5.png",
    ];
    let i = 0,
      t = null,
      delay = 2000;

    const container = (() => {
      const p = hero.parentElement;
      if (p && p.classList.contains("hero-container")) return p;
      const c = document.createElement("div");
      c.className = "hero-container";
      c.style.position = "relative";
      p.replaceChild(c, hero);
      c.appendChild(hero);
      return c;
    })();

    const mkBtn = (dir) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `hero-arrow hero-arrow-${dir}`;
      btn.innerHTML = dir === "left" ? "&#x2039;" : "&#x203A;";
      btn.style.position = "absolute";
      btn.style.top = "50%";
      btn.style.transform = "translateY(-50%)";
      btn.style.zIndex = "999";
      return btn;
    };

    if (!container.querySelector(".hero-arrow-left")) {
      const prev = mkBtn("left"),
        next = mkBtn("right");
      prev.addEventListener("click", () => {
        show(i - 1);
        restart();
      });
      next.addEventListener("click", () => {
        show(i + 1);
        restart();
      });
      container.appendChild(prev);
      container.appendChild(next);
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        show(i - 1);
        restart();
      }
      if (e.key === "ArrowRight") {
        show(i + 1);
        restart();
      }
    });

    container.addEventListener("mousedown", () => {
      if (t) {
        clearTimeout(t);
        t = null;
      }
    });
    window.addEventListener("mouseup", () => schedule());

    container.addEventListener(
      "touchstart",
      () => {
        if (t) {
          clearTimeout(t);
          t = null;
        }
      },
      { passive: true },
    );
    window.addEventListener("touchend", () => schedule());

    function show(n) {
      if (!slides.length) return;
      i = ((n % slides.length) + slides.length) % slides.length;
      hero.setAttribute("src", base + slides[i]);
    }

    function tick() {
      show(i + 1);
      schedule();
    }
    function schedule() {
      if (t) clearTimeout(t);
      t = setTimeout(tick, delay);
    }
    function restart() {
      if (t) clearTimeout(t);
      t = setTimeout(tick, delay);
    }

    const current = (hero.getAttribute("src") || "").split("/").pop();
    const start = slides.indexOf(current);
    i = start >= 0 ? start : 0;
    show(i);
    schedule();
  })();

  // --- Theme Toggle logic ---
  const themeToggle = document.getElementById("theme-toggle");
  const themeText = document.getElementById("theme-text");
  const sunPath = document.querySelector(".sun-path");
  const moonPath = document.querySelector(".moon-path");
  const currentTheme = localStorage.getItem("theme") || "light";

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (themeText) themeText.innerHTML = "Bright mode";
      if (sunPath) sunPath.style.display = "block";
      if (moonPath) moonPath.style.display = "none";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeText) themeText.innerHTML = "Dark Mode";
      if (sunPath) sunPath.style.display = "none";
      if (moonPath) moonPath.style.display = "block";
    }
  }

  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      let theme = document.documentElement.getAttribute("data-theme");
      let nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }
});

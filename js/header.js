const tpl = document.createElement("template");
tpl.innerHTML = `
  <style>
    header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-family: "Share Tech", sans-serif;
      font-size: 1.2rem;
      min-height: 125px;
      box-sizing: border-box;
      transition: background 0.25s ease, color 0.25s ease;
    }

    h1 {
      margin: 0;
      height: 40px;
      line-height: 40px;
      font-size: 1.2rem;
      background: var(--btn-bg);
      border-radius: 5px;
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .right-side {
      margin-right: 55px;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
    }

    nav {
      display: flex;
      gap: 1.5rem;
      background: var(--btn-bg);
      border-radius: 5px;
      padding-right: 1rem;
      padding-left: 1rem;
    }

    nav a {
      color: var(--link-color, #aaa);
      text-decoration: none;
      font-weight: 600;
      position: relative;
    }

    nav a:not(:last-child)::after {
      content: "/";
      color: var(--link-color, #aaa);
      margin-left: 1.5rem;
      position: absolute;
      right: -1rem;
    }

    nav a::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 5px;
      width: 0;
      height: 2px;
      background: var(--link-active, #fff);
      transition: width 0.25s ease;
    }

    nav a:hover::before, nav a.active::before {
      width: 100%;
    }

    nav a.active {
      color: var(--link-active, #fff);
    }

    .theme-toggle {
      width: 40px;
      height: 40px;
      border: none;
      cursor: pointer;
      padding: 0;
      outline: none;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;

      position: fixed;
      top: 1rem;
      right: 2rem;
      z-index: 9999;

      background: var(--btn-bg);
      border-radius: 5px;
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .theme-toggle img {
      width: 24px;
      height: 24px;
      filter: var(--icon-filter, invert(80%));
      transition: filter 0.25s ease;
    }

    /* ---- Mobile adjustments ---- */
    @media (max-width: 768px) {
      header {
        padding: 1rem;
        justify-content: center; /* center nav area */
      }

      h1 {
        display: none; /* hide HOME */
      }

      .right-side {
        margin: 0;
        justify-content: center;
        width: 100%;
      }

      nav {
        gap: 1.5rem;     
      }

      .theme-toggle {
        right: 1rem; /* keep theme button top right */
        top: 1rem;
        position: fixed;
      }
    }
  </style>

  <header>
    <h1>FAYCAL</h1>
    <div class="right-side">
      <nav>
        <a href="/index.html">PROJECTS</a>
        <a href="/bio.html">BIO</a>
        <a href="/contact.html">CONTACT</a>
      </nav>
      <button class="theme-toggle" aria-label="Toggle theme">
        <img src="/images/icons/theme-icon.svg" alt="Theme Toggle">
      </button>
    </div>
  </header>
`;

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(tpl.content.cloneNode(true));
  }

  connectedCallback() {
    if (!document.getElementById("site-theme-vars")) {
      const style = document.createElement("style");
      style.id = "site-theme-vars";
      style.textContent = `
        :root {
          --bg-color: #111;
          --btn-bg: #111;
          --text-color: #eee;
          --link-color: #aaa;
          --link-active: #fff;
          --icon-filter: invert(80%);
        }
        .light-theme {
          --bg-color: #fff;
          --btn-bg: #fff;
          --text-color: #111;
          --link-color: #444;
          --link-active: #000;
          --icon-filter: invert(20%);
        }
        body {
          background: var(--bg-color);
          color: var(--text-color);
          transition: background 0.25s ease, color 0.25s ease;
        }
        a { color: var(--link-color); }
        a.active { color: var(--link-active); }
        .social img {
          filter: var(--icon-filter);
          transition: filter 0.2s ease;
        }
        .social img:hover {
          filter: var(--icon-filter) brightness(1.2);
        }
      `;
      document.head.appendChild(style);
    }

    const currentPath = window.location.pathname;
    this.shadowRoot.querySelectorAll("nav a").forEach(link => {
      const href = link.getAttribute("href");
      if (currentPath === href || (currentPath === "/" && href === "/index.html")) {
        link.classList.add("active");
      }
    });

    const btn = this.shadowRoot.querySelector(".theme-toggle");
    if (sessionStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("light-theme");
    }

    btn.addEventListener("click", () => {
      document.documentElement.classList.toggle("light-theme");
      sessionStorage.setItem(
        "theme",
        document.documentElement.classList.contains("light-theme") ? "light" : "dark"
      );
    });
  }
}

customElements.define("custom-header", CustomHeader);

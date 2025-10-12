const footerTemplate = document.createElement("template");
footerTemplate.innerHTML = `
  <style>
    footer {
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;       /* stack children vertically */
      justify-content: flex-end;    /* push everything to bottom */
      width: 100%;
      box-sizing: border-box;
      margin-top: auto;
      min-height: 125px;            /* taller footer */
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    p {
      margin: 0;
    }

    .social {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .social a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .social img {
      width: 24px;
      height: 24px;
      display: block;
      filter: var(--icon-filter);
      transition: filter 0.2s ease;
    }

    .social img:hover {
      filter: var(--icon-filter) brightness(1.2);
    }
  </style>


  <footer>
    <div class="footer-content">
      <p>2025 &copy; Faycal</p>
      <div class="social">
        <a href="https://www.instagram.com/faycal.art_/" target="_blank">
          <img src="/images/icons/instagram.svg" alt="Instagram">
        </a>
        <a href="https://www.linkedin.com/in/faycal-mouffouk/" target="_blank">
          <img src="/images/icons/linkedin.svg" alt="LinkedIn">
        </a>
        <a href="https://x.com/faycal_art" target="_blank">
          <img src="/images/icons/x.svg" alt="ArtStation">
        </a>
      </div>
    </div>
  </footer>
`;

class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })
      .appendChild(footerTemplate.content.cloneNode(true));
  }
}

customElements.define("custom-footer", CustomFooter);

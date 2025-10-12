const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
  <style>
  
    .card {
      position: relative;
      overflow: hidden;
      height: 100%; /* fill the host */
    }
    .card a {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      color: inherit;
      text-decoration: none;
    }
    .card img,
    .card video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .overlay {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.4s ease;
    }
    .overlay p {
      opacity: 0;
      color: #fff;
      font-size: 1.5rem;
      text-align: center;
      padding: 0.5rem;
      transition: opacity 0.4s ease;
    }
    .card:hover .overlay {
      background: rgba(0, 0, 0, 0.6);
    }
    .card:hover .overlay p {
      opacity: 1;
    }
    .breakdown {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.4s ease;
      color: #fff;
      font-size: 1rem;
      text-align: center;
    }
    .breakdown img {
      width: 18px;
      height: 18px;
      filter: brightness(0) invert(1); /* force white */
    }
    /* Up-down motion */
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(6px); /* moves down */
      }
    }
    .card:hover .breakdown img {
    animation: bounce 0.9s infinite ease-in-out;
    }
    .card:hover .overlay .breakdown {
      opacity: 1;
    }
  </style>

  <div class="card">
    <a>
      <slot name="media"></slot>
      <div class="overlay">
        <p></p>
        <div class="breakdown">
          <span>View Breakdown</span>
          <img src="/images/icons/down.svg" loading="lazy" alt="Arrow icon">
        </div>
      </div>
    </a>
  </div>
`;

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })
      .appendChild(cardTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const url = this.getAttribute("url");
    const image = this.getAttribute("image");
    const video = this.getAttribute("video");
    const name = this.getAttribute("name");

    const anchor = this.shadowRoot.querySelector("a");
    const slot = this.shadowRoot.querySelector("slot");
    const title = this.shadowRoot.querySelector("p");

    anchor.href = url;
    title.textContent = name;

    // If video attribute is set, use <video>
    if (video) {
      const vid = document.createElement("video");
      vid.setAttribute("autoplay", "");
      vid.setAttribute("loop", "");
      vid.setAttribute("muted", "");
      vid.setAttribute("playsinline", "");
      const source = document.createElement("source");
      source.src = video;
      source.type = "video/mp4";
      vid.appendChild(source);
      slot.replaceWith(vid);
    }
    // Otherwise, use <img>
    else if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.alt = name;
      slot.replaceWith(img);
    }
  }
}

customElements.define("project-card", ProjectCard);

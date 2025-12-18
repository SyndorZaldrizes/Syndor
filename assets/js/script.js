function getBasePrefix() {
  const pathName = window.location.pathname;
  const pagesIndex = pathName.lastIndexOf("/pages/");
  let basePrefix = "";

  if (pagesIndex !== -1) {
    const remainder = pathName.slice(pagesIndex + "/pages/".length);
    const depth = remainder.split("/").length - 1;
    basePrefix = "../".repeat(depth + 1);
  }

  return basePrefix;
}

function buildHeaderMarkup() {
  return `
    <div class="inner">
      <a class="brand" data-nav-target="index.html#hero">
        <span class="brand-mark brand-mark-logo">
          <img data-asset-src="assets/img/logo-1.png" alt="SMCM MSL logo" />
        </span>
        <span class="brand-text">
          <span class="brand-title">MSL SMCM</span>
          <span class="brand-sub">Chapter</span>
        </span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
      <nav class="nav" id="mainNav">
        <a class="nav-link" data-page="home" data-nav-target="index.html#hero">Home</a>
        <a class="nav-link" data-page="about" data-nav-target="index.html#maryland">About MSL</a>
        <a class="nav-link" data-page="chapter" data-nav-target="index.html#chapter">Our Chapter</a>
        <a class="nav-link" data-page="journey" data-nav-target="index.html#journey">Your Journey</a>
        <a class="nav-link" data-page="documents" data-nav-target="index.html#documents">Documents</a>
        <a class="nav-link" data-page="gallery" data-nav-target="index.html#gallery">Gallery</a>
        <a class="nav-link" data-page="join" data-nav-target="index.html#contact">Join Us</a>
        <a class="nav-link" data-page="bulletin" data-nav-target="pages/bulletin.html">Bulletin</a>
        <a class="nav-link" data-page="exec" data-nav-target="pages/executive-board.html">Exec Board</a>
        <a class="nav-link" data-page="resources" data-nav-target="pages/resources.html">Resources</a>
        <a class="nav-link" data-page="games" data-nav-target="pages/msl-game.html">Games</a>
        <a class="nav-link" data-page="neophytus" data-nav-target="pages/neophytus.html">Neophytus</a>
      </nav>
    </div>
  `;
}

function renderSharedHeader() {
  const existing = document.getElementById("siteHeader");
  const header = existing || document.createElement("header");
  header.id = "siteHeader";
  if (!header.classList.contains("site-header")) {
    header.classList.add("site-header");
  }

  header.innerHTML = buildHeaderMarkup();

  if (!existing) {
    document.body.prepend(header);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const basePrefix = getBasePrefix();
  renderSharedHeader();

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const navTargets = document.querySelectorAll("[data-nav-target]");
  const assetTargets = document.querySelectorAll("[data-asset-src]");

  navTargets.forEach((link) => {
    const target = link.dataset.navTarget;
    if (target) {
      link.setAttribute("href", `${basePrefix}${target}`);
    }
  });

  assetTargets.forEach((asset) => {
    const source = asset.dataset.assetSrc;
    if (source) {
      asset.setAttribute("src", `${basePrefix}${source}`);
    }
  });

  const activePage = document.body.dataset.page;
  if (activePage) {
    const activeLink = document.querySelector(`.nav-link[data-page="${activePage}"]`);
    if (activeLink) {
      activeLink.classList.add("nav-link--active");
      activeLink.setAttribute("aria-current", "page");
    }
  }

  if (!navToggle || !mainNav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === "a") {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});
// Home-page interest form → opens Google Form and copies text
function handleInterestFormSubmit(e) {
  if (e) e.preventDefault();

  const nameEl = document.getElementById("interestName");
  const emailEl = document.getElementById("interestEmail");
  const msgEl = document.getElementById("interestMessage");

  if (!nameEl || !emailEl || !msgEl) {
    return false;
  }

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const msg = msgEl.value.trim();

  const summary = `Name: ${name}\nEmail: ${email}\nInterest: ${msg}`;

  // Try to copy to clipboard so they can paste into the Google Form
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(summary).catch(() => {});
  }

  alert(
    "Thanks for reaching out! We've opened the full interest form in a new tab.\n\n" +
    "Your details have been copied to your clipboard—just paste them into the form."
  );

  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSc0XiBlQ8x5nI435iu9_KyscV_wDY-HUnP_6WCB7Sz_jIHtpg/viewform?usp=dialog",
    "_blank",
    "noopener"
  );

  return false;
}

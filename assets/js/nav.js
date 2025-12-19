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

function applyBasePrefix(navRoot, basePrefix) {
  const navTargets = navRoot.querySelectorAll("[data-nav-target]");
  const assetTargets = navRoot.querySelectorAll("[data-asset-src]");

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
}

function highlightActive(navRoot) {
  const activePage = document.body.dataset.page;
  if (!activePage) return;

  const activeLink = navRoot.querySelector(`.nav-link[data-page="${activePage}"]`);
  if (activeLink) {
    activeLink.classList.add("nav-link--active");
    activeLink.setAttribute("aria-current", "page");
  }
}

function setupNavToggle(navToggle, mainNav) {
  if (!navToggle || !mainNav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName && target.tagName.toLowerCase() === "a") {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupScrollState(header) {
  if (!header) return;

  const toggleScrolled = () => {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  toggleScrolled();
  window.addEventListener("scroll", toggleScrolled);
}

document.addEventListener("DOMContentLoaded", async () => {
  const siteNav = document.getElementById("site-nav");
  const header = document.getElementById("siteHeader") || (siteNav ? siteNav.closest("header") : null);
  const basePrefix = getBasePrefix();

  if (!siteNav) return;
  if (header && !header.classList.contains("site-header")) {
    header.classList.add("site-header");
  }

  try {
    const navResponse = await fetch(`${basePrefix}assets/partials/nav.html`);
    if (!navResponse.ok) {
      throw new Error(`Unable to load nav partial: ${navResponse.status}`);
    }

    const navMarkup = await navResponse.text();
    siteNav.innerHTML = navMarkup;
  } catch (error) {
    console.error(error);
    return;
  }

  applyBasePrefix(siteNav, basePrefix);

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  highlightActive(siteNav);
  setupNavToggle(navToggle, mainNav);
  setupScrollState(header);
});

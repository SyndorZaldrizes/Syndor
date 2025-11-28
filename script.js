document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (!navToggle || !mainNav) return;

  // Toggle nav on burger click
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close nav when clicking a link (for mobile)
  mainNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === "a") {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

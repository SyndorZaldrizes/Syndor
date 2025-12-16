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

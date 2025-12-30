document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TYPING EFFECT
  ========================= */

  const phrases = [
    "With Strategy.",
    "With Confidence.",
    "With AMSON."
  ];

  const typedText = document.getElementById("typed-text");

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 80;
  const deletingSpeed = 50;
  const pauseAfterTyping = 1400;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typedText.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), pauseAfterTyping);
      }
    } else {
      typedText.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(
      typeLoop,
      isDeleting ? deletingSpeed : typingSpeed
    );
  }

  if (typedText) typeLoop();


  /* =========================
     PROMO BANNER
  ========================= */

  const banner = document.getElementById("promoBanner");
  const closeBtn = document.getElementById("promoClose");

  if (!banner || !closeBtn) return;

  /* 🔥 FORCE SHOW ON EVERY REFRESH */
  localStorage.removeItem("promoDismissed");

  document.body.classList.add("has-banner");

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    banner.style.transform = "translateY(-100%)";
    banner.style.opacity = "0";

    document.body.classList.remove("has-banner");

    setTimeout(() => banner.remove(), 400);

    localStorage.setItem("promoDismissed", "true");
  });


  /* HOW DOES IT WORK NAV */
const tabs = document.querySelectorAll(".feature-tab");
const panels = document.querySelectorAll(".feature-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active states
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    // Activate clicked tab
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

});

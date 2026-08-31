
(() => {
  const cfg = window.DZBOT_CONFIG || {};
  const message = encodeURIComponent("Olá! Conheci o DZbot pelo site e quero um orçamento personalizado para minha guild/PT no RubinOT.");
  const contact = cfg.whatsapp
    ? `https://wa.me/${cfg.whatsapp}?text=${message}`
    : `mailto:${cfg.email || ""}?subject=${encodeURIComponent("Orçamento DZbot")}`;

  document.querySelectorAll("[data-contact]").forEach(el => {
    el.href = contact;
    if (cfg.whatsapp) { el.target = "_blank"; el.rel = "noopener noreferrer"; }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }
})();

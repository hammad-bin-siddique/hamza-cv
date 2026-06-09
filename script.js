/* Cursor */
const dot = document.getElementById("cur-dot");
const ring = document.getElementById("cur-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function loop() {
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";

  // Hover expand
  const el = document.elementFromPoint(mx, my);
  const isHov = el && el.closest("a,button,.cv-card,.lang-c,.hob-tag");
  ring.style.width = isHov ? "54px" : "38px";
  ring.style.height = isHov ? "54px" : "38px";
  ring.style.opacity = isHov ? ".28" : ".5";
  ring.style.borderColor = isHov ? "var(--accent-gold)" : "var(--accent-main)";
  dot.style.background = isHov ? "var(--accent-gold)" : "var(--accent-main)";
  requestAnimationFrame(loop);
})();
document.addEventListener("mouseleave", () => {
  dot.style.opacity = "0";
  ring.style.opacity = "0";
});
document.addEventListener("mouseenter", () => {
  dot.style.opacity = "1";
  ring.style.opacity = "";
});

/* Theme */
function toggleTheme() {
  const h = document.documentElement;
  const ico = document.getElementById("themeIco");
  const lbl = document.getElementById("themeLbl");
  const dark = h.dataset.theme === "dark";
  h.dataset.theme = dark ? "light" : "dark";
  ico.className = dark ? "fas fa-moon" : "fas fa-sun";
  lbl.textContent = dark ? "Dark Mode" : "Light Mode";
  localStorage.setItem("cv-theme", h.dataset.theme);
}
// Restore
(() => {
  const saved = localStorage.getItem("cv-theme");
  if (!saved) return;
  document.documentElement.dataset.theme = saved;
  document.getElementById("themeIco").className =
    saved === "dark" ? "fas fa-sun" : "fas fa-moon";
  document.getElementById("themeLbl").textContent =
    saved === "dark" ? "Light Mode" : "Dark Mode";
})();

/* Scroll reveal */
const revItems = document.querySelectorAll(
  ".cv-card,.lang-c,.hob-tag,.obj-box",
);
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "0";
        e.target.style.transform = "translateY(22px)";
        setTimeout(() => {
          e.target.style.transition = "opacity .5s ease,transform .5s ease";
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }, i * 55);
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
revItems.forEach((el) => {
  el.style.opacity = "0";
  ro.observe(el);
});

/* Skill bars */
const fills = document.querySelectorAll(".sk-fill");
const so = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.animation = "barFill 1.5s cubic-bezier(.4,0,.2,1) both";
        so.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
fills.forEach((f) => so.observe(f));

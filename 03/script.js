const splitLetters = (element) => {
  const text = element.textContent.trim();
  element.textContent = "";

  text.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.className = "char";
    span.innerHTML = letter === " " ? "&nbsp;" : letter;
    element.appendChild(span);
  });
};

if (window.feather) {
  feather.replace();
}

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelectorAll(".nav__links a");

const setMenuIcon = (isOpen) => {
  if (!window.feather || !navToggle) return;

  const icon = isOpen ? feather.icons.x : feather.icons.menu;
  navToggle.innerHTML = icon.toSvg({
    width: 23,
    height: 23,
    "stroke-width": 3,
  });
};

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  setMenuIcon(isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menu");
    setMenuIcon(false);
  });
});

const title = document.querySelector("[data-title]");
const backTitle = document.querySelector("[data-split]");

splitLetters(title);
splitLetters(backTitle);

const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(".nav", {
  y: -28,
  opacity: 0,
  duration: 0.85,
})
  .from(
    ".hero__back-title .char",
    {
      y: 90,
      opacity: 0,
      scaleY: 0.65,
      stagger: 0.035,
      duration: 0.9,
    },
    "-=0.35"
  )
  .from(
    ".hero__player",
    {
      y: 90,
      opacity: 0,
      scale: 0.96,
      duration: 1.05,
    },
    "-=0.62"
  )
  .from(
    ".hero__title .char",
    {
      yPercent: 120,
      opacity: 0,
      rotateX: -72,
      scale: 0.82,
      stagger: 0.07,
      duration: 0.9,
    },
    "-=0.35"
  )
  .to(
    ".fade-up",
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.72,
    },
    "-=0.55"
  )
  .from(
    ".stats article",
    {
      y: 24,
      opacity: 0,
      stagger: 0.08,
      duration: 0.65,
    },
    "-=0.42"
  );

gsap.fromTo(
  ".hero__glow",
  { opacity: 0.45, scale: 0.92 },
  {
    opacity: 0.8,
    scale: 1.07,
    duration: 3.6,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  }
);

gsap.to(".hero__player img", {
  y: -8,
  duration: 3.1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
});

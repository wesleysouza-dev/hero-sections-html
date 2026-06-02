const splitWords = (element) => {
  const words = element.textContent.trim().split(/\s+/);

  element.textContent = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    element.appendChild(span);

    if (index < words.length - 1) {
      element.append(" ");
    }
  });
};

const revealFallback = () => {
  document.querySelectorAll("[data-split]").forEach(splitWords);
  document.querySelectorAll(".word").forEach((word) => {
    word.style.opacity = "1";
    word.style.transform = "none";
  });
  document.querySelectorAll("[data-count]").forEach((counter) => {
    counter.textContent = counter.dataset.count;
  });
};

const animateCounters = () => {
  document.querySelectorAll("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count);
    const value = { current: 0 };

    gsap.to(value, {
      current: target,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => {
        counter.textContent = Math.round(value.current);
      },
    });
  });
};

const animateHero = () => {
  document.querySelectorAll("[data-split]").forEach(splitWords);

  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  timeline
    .from(".brand, .nav-menu a", {
      y: -18,
      opacity: 0,
      duration: 0.75,
      stagger: 0.07,
    })
    .from(
      ".quote-button",
      {
        opacity: 0,
        duration: 0.55,
        clearProps: "transform",
      },
      "-=0.45"
    )
    .from(
      ".social-bar a",
      {
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        clearProps: "transform",
      },
      "-=0.25"
    )
    .to(
      ".hero__title .word",
      {
        y: 0,
        opacity: 1,
        duration: 0.82,
        stagger: 0.055,
      },
      "-=0.05"
    )
    .to(
      ".hero__description .word",
      {
        y: 0,
        opacity: 1,
        duration: 0.68,
        stagger: 0.025,
      },
      "-=0.28"
    )
    .from(
      ".metric",
      {
        y: 38,
        opacity: 0,
        duration: 0.82,
        stagger: 0.12,
        onStart: animateCounters,
      },
      "-=0.18"
    );
};

const loadHeroVideo = () => {
  const video = document.querySelector(".hero__video");
  const source = document.createElement("source");

  video.addEventListener(
    "canplay",
    () => {
      video.classList.add("is-visible");
      video.play().catch(() => {});
    },
    { once: true }
  );

  source.src = "assets/video.mp4";
  source.type = "video/mp4";
  video.appendChild(source);
  video.load();
};

const setupMobileMenu = () => {
  const toggle = document.querySelector(".menu-toggle");
  const close = document.querySelector(".menu-close");
  const menu = document.querySelector("#main-menu");

  if (!toggle || !menu) {
    return;
  }

  const setMenuState = (isOpen) => {
    menu.classList.toggle("is-open", isOpen);
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    setMenuState(!menu.classList.contains("is-open"));
  });

  close?.addEventListener("click", () => {
    setMenuState(false);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (window.feather) {
    feather.replace();
  }

  setupMobileMenu();

  if (window.gsap) {
    animateHero();
    return;
  }

  revealFallback();
});

window.addEventListener("load", loadHeroVideo);

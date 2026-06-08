const loader = document.querySelector("[data-loader]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const soundToggle = document.querySelector("[data-sound-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const gameCards = document.querySelectorAll(".game-card");
const carousel = document.querySelector("[data-carousel]");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, 700);
});

function updateThemeButton(theme) {
  const isLight = theme === "light";
  themeToggle?.setAttribute("aria-pressed", String(isLight));
  if (themeLabel) {
    themeLabel.textContent = isLight ? "Modo escuro" : "Modo claro";
  }
}

updateThemeButton(document.documentElement.dataset.theme);

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("pixelforge-theme", nextTheme);
  updateThemeButton(nextTheme);
});

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedGenre = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    gameCards.forEach((card) => {
      const shouldShow = selectedGenre === "all" || card.dataset.genre === selectedGenre;
      card.classList.toggle("is-hidden", !shouldShow);
    });

    carousel?.scrollTo({ left: 0, behavior: "smooth" });
  });
});

function scrollCarousel(direction) {
  if (!carousel) return;

  const visibleCards = Array.from(gameCards).filter((card) => !card.classList.contains("is-hidden"));
  const firstVisibleCard = visibleCards[0];
  const cardWidth = firstVisibleCard ? firstVisibleCard.getBoundingClientRect().width + 16 : 300;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth - 8;
  const nextLeft = carousel.scrollLeft + cardWidth * direction;

  if (direction > 0 && carousel.scrollLeft >= maxScroll) {
    carousel.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }

  if (direction < 0 && carousel.scrollLeft <= 0) {
    carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
    return;
  }

  carousel.scrollBy({ left: nextLeft - carousel.scrollLeft, behavior: "smooth" });
}

prevButton?.addEventListener("click", () => scrollCarousel(-1));
nextButton?.addEventListener("click", () => scrollCarousel(1));

const errors = {
  name: "Digite seu nome com pelo menos 2 caracteres.",
  email: "Digite um e-mail valido.",
  message: "Escreva uma mensagem com pelo menos 10 caracteres."
};

function setFieldError(fieldName, message = "") {
  const errorElement = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const validations = {
    name: name.length >= 2,
    email: isValidEmail(email),
    message: message.length >= 10
  };

  Object.entries(validations).forEach(([fieldName, isValid]) => {
    setFieldError(fieldName, isValid ? "" : errors[fieldName]);
  });

  const formIsValid = Object.values(validations).every(Boolean);

  if (!formIsValid) {
    formStatus.textContent = "";
    return;
  }

  formStatus.textContent = "Mensagem registrada com sucesso. A forja recebeu sua ideia.";
  contactForm.reset();
});

let audioContext;
let musicTimer;
let stepIndex = 0;

const melody = [196, 247, 294, 392, 330, 294, 247, 392];

function playTone(frequency, startTime, duration) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function playMusicStep() {
  if (!audioContext) return;

  const time = audioContext.currentTime;
  const note = melody[stepIndex % melody.length];
  playTone(note, time, 0.18);

  if (stepIndex % 4 === 0) {
    playTone(note / 2, time, 0.28);
  }

  stepIndex += 1;
}

function startMusic() {
  audioContext = audioContext || new AudioContext();
  playMusicStep();
  musicTimer = window.setInterval(playMusicStep, 230);
  soundToggle?.classList.add("is-active");
  soundToggle?.setAttribute("aria-pressed", "true");
  if (soundToggle) {
    soundToggle.textContent = "Pausar som";
  }
}

function stopMusic() {
  window.clearInterval(musicTimer);
  musicTimer = undefined;
  soundToggle?.classList.remove("is-active");
  soundToggle?.setAttribute("aria-pressed", "false");
  if (soundToggle) {
    soundToggle.textContent = "Som";
  }
}

soundToggle?.addEventListener("click", async () => {
  if (musicTimer) {
    stopMusic();
    return;
  }

  if (audioContext?.state === "suspended") {
    await audioContext.resume();
  }

  startMusic();
});

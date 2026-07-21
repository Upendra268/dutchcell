const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const arrivalFilm = document.getElementById("arrivalFilm");
const filmStage = document.querySelector(".film-stage");
const filmControl = document.getElementById("filmControl");

window.addEventListener("scroll", () => {
  header.classList.toggle("compact", window.scrollY > 70);
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  });
});

let restartTimer;

arrivalFilm.addEventListener("ended", () => {
  filmStage.classList.add("show-still");
  filmControl.classList.add("paused");
  filmControl.setAttribute("aria-label", "Play arrival film");

  restartTimer = window.setTimeout(() => {
    arrivalFilm.currentTime = 0;
    const playback = arrivalFilm.play();

    if (playback) {
      playback.then(() => {
        window.setTimeout(() => {
          filmStage.classList.remove("show-still");
          filmControl.classList.remove("paused");
          filmControl.setAttribute("aria-label", "Pause arrival film");
        }, 120);
      }).catch(() => {
        filmControl.classList.add("paused");
      });
    }
  }, 2000);
});

filmControl.addEventListener("click", () => {
  window.clearTimeout(restartTimer);

  if (arrivalFilm.paused) {
    arrivalFilm.play();
    filmStage.classList.remove("show-still");
    filmControl.classList.remove("paused");
    filmControl.setAttribute("aria-label", "Pause arrival film");
  } else {
    arrivalFilm.pause();
    filmControl.classList.add("paused");
    filmControl.setAttribute("aria-label", "Play arrival film");
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = event.currentTarget.querySelector("button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Thank You";
  submitButton.disabled = true;

  window.setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    event.currentTarget.reset();
  }, 2500);
});

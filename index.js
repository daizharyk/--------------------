document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider__track");
  const slides = document.querySelectorAll(".slider__image");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  btnRight.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  btnLeft.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // ===== Свайпы (touch events) =====
  let startX = 0;
  let isSwiping = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (Math.abs(diffX) > 50) {
      isSwiping = false;
      if (diffX < 0) {
        // Свайп влево
        index = (index + 1) % slides.length;
      } else {
        // Свайп вправо
        index = (index - 1 + slides.length) % slides.length;
      }
      updateSlider();
    }
  });

  track.addEventListener("touchend", () => {
    isSwiping = false;
  });

  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");

  if (music && button) {
    let isPlaying = false;

    const startMusic = () => {
      music.play().catch(() => {}); // на случай авто-блокировки
      isPlaying = true;
      button.textContent = "||";
    };

    button.addEventListener("click", () => {
      if (isPlaying) {
        music.pause();
        button.textContent = "▶︎";
      } else {
        music.play().catch(() => {});
        button.textContent = "||";
      }
      isPlaying = !isPlaying;
    });

    const initPlayOnce = () => {
      startMusic();
      document.removeEventListener("click", initPlayOnce);
    };

    document.addEventListener("click", initPlayOnce);
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    document.querySelectorAll(".parallax").forEach((el) => {
      if (!el) return;

      const speed = parseFloat(el.dataset.speed) || 0.2;
      let rotateDeg = 0;

      el.style.transform = `translateY(${
        -scrollY * speed
      }px) rotate(${rotateDeg}deg)`;
    });
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  const elements = document.querySelectorAll(".fade-in-on-scroll");
  elements.forEach((el) => observer.observe(el));
});

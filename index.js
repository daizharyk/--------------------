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
});

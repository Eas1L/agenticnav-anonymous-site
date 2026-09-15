(() => {
  const carousel = document.querySelector(".figure-carousel");
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const dots = Array.from(document.querySelectorAll(".carousel-dot"));
  let activeSlide = 0;
  let touchStartX = null;

  const showSlide = (index) => {
    if (!slides.length) return;
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeSlide;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });
  };

  document.querySelectorAll(".carousel-arrow").forEach((button) => {
    button.addEventListener("click", () => {
      showSlide(activeSlide + Number(button.dataset.direction));
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.target)));
  });

  if (carousel) {
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        showSlide(activeSlide - 1);
      }
      if (event.key === "ArrowRight") {
        showSlide(activeSlide + 1);
      }
    });

    carousel.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
      if (touchStartX === null) return;
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 48) {
        showSlide(activeSlide + (delta < 0 ? 1 : -1));
      }
      touchStartX = null;
    }, { passive: true });
  }

  const scrollTopButton = document.querySelector(".scroll-top");
  if (scrollTopButton) {
    const updateScrollTop = () => {
      scrollTopButton.classList.toggle("is-visible", window.scrollY > 480);
    };

    window.addEventListener("scroll", updateScrollTop, { passive: true });
    updateScrollTop();

    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

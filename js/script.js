document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonial-track");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const totalCards = 8; // Original cards, duplicates are for seamless transition
  let autoSlideInterval;

  function stopAllVideos() {
    const videos = document.querySelectorAll(".testimonial-track video");
    videos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  }

  function isAnyVideoPlaying() {
    const videos = document.querySelectorAll(".testimonial-track video");
    return Array.from(videos).some((video) => !video.paused);
  }

  function clearAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  function startAutoSlide() {
    clearAutoSlide();
    autoSlideInterval = setInterval(() => {
      if (!isAnyVideoPlaying()) {
        nextSlide();
      }
    }, 5000);
  }

  function updateSlider() {
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
  }

  function nextSlide() {
    // Stop all videos before moving to next
    stopAllVideos();

    currentIndex++;
    if (currentIndex >= totalCards) {
      // Reset to first card without animation
      track.style.transition = "none";
      currentIndex = 0;
      updateSlider();
      // Force reflow
      track.offsetHeight;
      track.style.transition = "transform 0.5s ease-in-out";
    } else {
      updateSlider();
    }

    // Restart auto-slide
    startAutoSlide();
  }

  function prevSlide() {
    // Stop all videos before moving to previous
    stopAllVideos();

    if (currentIndex === 0) {
      // Go to last card without animation
      track.style.transition = "none";
      currentIndex = totalCards - 1;
      updateSlider();
      // Force reflow
      track.offsetHeight;
      track.style.transition = "transform 0.5s ease-in-out";
    } else {
      currentIndex--;
      updateSlider();
    }

    // Restart auto-slide
    startAutoSlide();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Add event listeners to videos to detect play/pause
  const videos = document.querySelectorAll(".testimonial-track video");
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      clearAutoSlide();
    });

    video.addEventListener("pause", () => {
      startAutoSlide();
    });

    video.addEventListener("ended", () => {
      startAutoSlide();
    });
  });

  // Start auto-slide
  startAutoSlide();

  // Initialize
  updateSlider();
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isActive = item.classList.contains("active");

    // Close all items
    document
      .querySelectorAll(".accordion-item")
      .forEach((i) => i.classList.remove("active"));

    // Open clicked item if not already open
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

const form = document.querySelector(".phone-form form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".thank-you-message").classList.remove("hidden");
});

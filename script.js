document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonial-track");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const totalCards = 8; // Original cards, duplicates are for seamless transition

  function updateSlider() {
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
  }

  function nextSlide() {
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
  }

  function prevSlide() {
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
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Initialize
  updateSlider();
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
    
    // Open clicked item if not already open
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

'use strict';

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const sliderContainer = document.querySelector('.slider-container');
const currentSlideNumber = document.querySelector('.current-slide');
const totalSlidesNumber = document.querySelector('.total-slides');
const slideCounter = document.querySelector('.slide-counter');
const autoPlayInterval = 4000;
let autoPlay;
let isAutoPlaying = true;

totalSlidesNumber.textContent = slides.length - 1;

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 2;
  } else {
    slideIndex = index;
  }

  const offset = -slideIndex * 100;

  document.querySelector('.slider').style.transform = `translateX(${offset}%)`;

  if (slideIndex === 0) {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    document.getElementById('save-button').style.display = 'none';
    slideCounter.style.display = 'none';
  } else {
    prevButton.style.display = 'block';
    nextButton.style.display = 'block';
    document.getElementById('save-button').style.display = 'block';
    slideCounter.style.display = 'inline';
    currentSlideNumber.textContent = `${slideIndex}/${slides.length - 2}`;
  }

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === slideIndex);
  });

  currentSlideNumber.textContent = slideIndex;
}

function handleAnimations() {
  const currentSlide = slides[slideIndex];
  const h1 = currentSlide.querySelector('.slider_h1');
  const p1 = currentSlide.querySelector('.slider_p1');
  const p2 = currentSlide.querySelector('.slider_p2');
  const p3 = currentSlide.querySelector('.slider_p3');
  const h2 = currentSlide.querySelector('.slider_h2');
  const h1Second = currentSlide.querySelector('.slider2_h1');
  const p1Second = currentSlide.querySelector('.slider2_p1');
  const h2Second = currentSlide.querySelector('.slider2_h2');

  [h1, p1, p2, p3, h2, h1Second, p1Second, h2Second].forEach(el => {
    if (el) {
      el.style.animation = 'none';

      setTimeout(() => {
        el.style.animation = '';
      }, 10);
    }
  });
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
  handleAnimations();
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
  handleAnimations();
}

function startAutoPlay() {
  if (!isAutoPlaying) {
    return;
  }
  autoPlay = setInterval(nextSlide, autoPlayInterval);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
  isAutoPlaying = false;
}

nextButton.addEventListener('click', () => {
  nextSlide();

  if (!isAutoPlaying) {
    isAutoPlaying = true;
    startAutoPlay();
  }
});

prevButton.addEventListener('click', () => {
  prevSlide();

  if (!isAutoPlaying) {
    isAutoPlaying = true;
    startAutoPlay();
  }
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    slideIndex = i;
    showSlide(slideIndex);
    handleAnimations();

    if (!isAutoPlaying) {
      isAutoPlaying = true;
      startAutoPlay();
    }
  });
});

sliderContainer.addEventListener('click', () => {
  if (isAutoPlaying) {
    stopAutoPlay();
  } else {
    isAutoPlaying = true;
    startAutoPlay();
  }
});

showSlide(slideIndex);
handleAnimations();
startAutoPlay();

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition >= 200 && !isAutoPlaying) {
    isAutoPlaying = true;
    startAutoPlay();
  }
});

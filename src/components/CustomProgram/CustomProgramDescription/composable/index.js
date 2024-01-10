import { ref } from 'vue'

let currentSlide = ref(0)

const scrollSlider = (direction) => {
  const slider = document.querySelector('.program-description__slider');
  const slideWidth = slider.clientWidth;
  const totalSlides = document.querySelectorAll('.program-description__slider-item').length;

  if (direction === 'left' && currentSlide.value > 0) currentSlide.value--
  else if (direction === 'right' && currentSlide.value < totalSlides - 1) currentSlide.value++

  slider.scrollTo({
    left: currentSlide.value * slideWidth,
    behavior: 'smooth',
  })
}

export {
  scrollSlider
}
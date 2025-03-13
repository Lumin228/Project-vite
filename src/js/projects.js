import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const refs = {
  projectsNext: document.querySelector('.swiper-btn-next'),
  projectsPrev: document.querySelector('.swiper-btn-prev'),
};

const swiper = new Swiper('.projects-swiper', {
  slidesPerView: 1,
  simulateTouch: true,
  slideToClickedSlide: true,
  modules: [Navigation, Keyboard],
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 1,
    },
    // when window width is >= 1440px
    1440: {
      slidesPerView: 1,
    },
  },
  navigation: {
    nextEl: '.projets-nav-btns>.swiper-btn-next',
    prevEl: '.projets-nav-btns>.swiper-btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});

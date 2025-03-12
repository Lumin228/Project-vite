import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

document.addEventListener('DOMContentLoaded', function () {
const aboutMeAccordion = new Accordion('.accordion-list', {
    duration: 400,
    showMultiple: false,
    openOnInit: [0], 
});
document.querySelectorAll('.ac-header').forEach((header) => {
    header.addEventListener('click', function () {
    const icon = this.querySelector('.acc-icon svg');
    if (!icon) return;
    const parentItem = this.closest('.ac');
    if (parentItem.classList.contains('is-active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
    });
});
setTimeout(() => {
    const firstItem = document.querySelector('.ac.is-active');
    if (firstItem) {
        const firstIcon = firstItem.querySelector('.acc-icon svg');
        if (firstIcon) {
        firstIcon.style.transform = 'rotate(180deg)';
    }
    }
}, 100);
});

import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('#about-me-swiper', {
        modules: [Navigation, Keyboard],
        loop: true,
        slidesPerView: 1,
        loopedSlides: 12,
        freeMode: false,
        grabCursor: true,
        simulateTouch: true,
        slidesPerGroup: 1,
        centeredSlides: false,
        slideToClickedSlide: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '#about-me-swiper-next', 
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            375: {
                slidesPerView: 2 },
            768: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView:6,
            },
        },
        on: {
            init: function () {
                setActiveSlide(this);
            },
            slideChange: function () {
                setActiveSlide(this);
            },
        },
    });
    function setActiveSlide(swiper) {
        const slides = document.querySelectorAll('.swiper-slide');
        slides.forEach(slide => slide.classList.remove('red-skills')); 
        swiper.slides[swiper.activeIndex].classList.add('red-skills');
    }

    const nextButton = document.querySelector('#about-me-swiper-next');
    if (nextButton) {
        nextButton.style.display = 'block';
    }
    
});

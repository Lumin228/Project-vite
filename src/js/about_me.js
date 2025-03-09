import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

// import Swiper from 'swiper';
// import 'swiper/css';


document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const isActive = accordionItem.classList.contains('active');

        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});


// const swiper = new Swiper('.swiper', {
//     slidesPerView: 'auto',
//     loop: true,
//     spaceBetween: 10,
//     keyboard: {
//         enabled: true,
//         onlyInViewport: false,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// });

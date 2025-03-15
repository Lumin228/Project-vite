import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

document.addEventListener("DOMContentLoaded", function () {
    const accordion = new Accordion('.faq-list', {
        duration: 500,
        showMultiple: false,
        elementClass: 'faq-item',
        triggerClass: 'faq-box-question',
        panelClass: 'faq-box-answer',
        activeClass: 'active',
        beforeOpen: function (element) {
            const btn = element.querySelector('.faq-btn .arrow-faq');
            if (btn) btn.style.transform = 'rotate(180deg)';
        },
        beforeClose: function (element) {
            const btn = element.querySelector('.faq-btn .arrow-faq');
            if (btn) btn.style.transform = 'rotate(0deg)';
        }
    });
});





import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import axios from 'axios';

const modalFooter = basicLightbox.create(`
    <div class="modal">
    <button class="modal-close">
     <svg class="modal-close-icon">
    <use href="./img/Icons/symbol-defs.svg#icon-close"></use>
     </svg>
     </button>
    <h2 class="modal-header">Thank you for your interest in cooperation!</h2>
    <p class="modal-text">The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.</p>
    </div>
	
`, {
    closable: true
})



const refs = {
    emailInp: document.querySelector("#email"),
    commentInp: document.querySelector("#comment"),
    footerForm: document.querySelector(".footer-form"),
}
refs.footerForm.addEventListener("submit", onFormSubmit);



function onFormSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value.trim();
    const comment = event.target.elements.comment.value.trim();
    const data = {
        email: email,
        comment: comment,
    }
    if (!email || !comment) {
        iziToast.error({
            title: 'Error',
            message: `All form fields must be filled in`,
            position: 'topCenter',
            closeOnClick: true,
        });
    }
    else {
        console.log(data);
        axios.post('https://portfolio-js.b.goit.study/api/requests', data);
        modalFooter.show();
        document.querySelector(".modal-close").addEventListener("click", (e) => {
            modalFooter.close();
        })
        refs.footerForm.reset();
    };

}


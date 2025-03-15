
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
  emailStatus: document.querySelector(".email-status"),
  emailLabel: document.querySelector(".email-label"),
  commentLabel: document.querySelector(".comment-label"),
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
refs.emailInp.addEventListener("change", (e) => {
  if (validateEmail(e.target.value)) {
    refs.emailStatus.classList.add("success");
    refs.emailStatus.classList.remove("invalid");
    refs.emailLabel.style.borderBottom = "1px solid #3cbc81";
  }
  else {
    refs.emailStatus.classList.add("invalid");
    refs.emailLabel.style.borderBottom = "1px solid #e74a3b";
  }
});
refs.emailInp.addEventListener("input", (e) => { truncateText(e.target, refs.emailLabel) })
refs.commentInp.addEventListener("input", (e) => { truncateText(e.target, refs.commentLabel) })

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

    axios.post('https://portfolio-js.b.goit.study/api/requests', data);
    modalFooter.show();
    document.querySelector(".modal-close").addEventListener("click", (e) => {
      modalFooter.close();
      refs.footerForm.reset();
    })

  };

}

function truncateText(input, label) {
  // Визначаємо ширину input
  const inputWidth = input.clientWidth; // Отримуємо ширину input в пікселях
  const avgCharWidth = 7; // Середня ширина одного символу (можна підлаштувати)
  // Розраховуємо максимальну кількість символів, які вміщуються в input
  const maxLength = Math.floor(inputWidth / avgCharWidth);
  let text = input.value;
  if (text.length > maxLength) {
    label.querySelector(".dots").textContent = "...";
  }
  else {
    label.querySelector(".dots").textContent = " ";
  }
}




// const footerEmail = document.querySelector('#email');
// const message = document.querySelector('.message');
// const checkStatus = document.querySelector('.check-status');

// footerEmail.addEventListener('input', function () {
//   const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
//   const isValid = emailPattern.test(this.value);

//   this.classList.toggle('success', isValid);
//   this.classList.toggle('error', !isValid);

//   checkStatus.classList.toggle('success', isValid);
//   checkStatus.classList.toggle('error', !isValid);

//   message.textContent = isValid ? 'Success!' : 'Invalid email, try again';
//   message.classList.toggle('success-message', isValid);
//   message.classList.toggle('error-message', !isValid);
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.querySelector('.footer-form');
//   const modal = document.querySelector('.backdrop');
//   const closeModalBtn = document.querySelector('.modal-close');

//   form.addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const data = {
//       email: formData.get('email'),
//       message: formData.get('text'),
//     };

//     try {
//       const response = await fetch(
//         'https://jsonplaceholder.typicode.com/posts',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Помилка відправки. Спробуйте ще раз.');
//       }

//       openModal();
//       form.reset();
//     } catch (error) {
//       alert(error.message);
//     }
//   });

//   function openModal() {
//     modal.classList.add('is-open');
//     document.body.style.overflow = 'hidden';
//     document.addEventListener('keydown', onEscKeyPress);
//   }

//   function closeModal() {
//     modal.classList.remove('is-open');
//     document.body.style.overflow = '';
//     document.removeEventListener('keydown', onEscKeyPress);
//   }

//   function onEscKeyPress(event) {
//     if (event.key === 'Escape') {
//       closeModal();
//     }
//   }

//   closeModalBtn.addEventListener('click', closeModal);

//   modal.addEventListener('click', function (event) {
//     if (event.target === modal) {
//       closeModal();
//     }
//   });
// });

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import axios from 'axios';

const modalFooter = basicLightbox.create(
  `
    <div class="modal">
    <button class="modal-close">
     <svg class="modal-close-icon">
    <use href="./img/Icons/symbol-defs.svg#icon-close"></use>
     </svg>
     </button>
    <h2 class="modal-header">Thank you for your interest in cooperation!</h2>
    <p class="modal-text">The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.</p>
    </div>
	
`,
  {
    closable: true,
  }
);

const refs = {
  emailInp: document.querySelector('#email'),
  commentInp: document.querySelector('#comment'),
  footerForm: document.querySelector('.footer-form'),
  emailStatus: document.querySelector('#emailStatusMessage'),
  emailLabel: document.querySelector('.email-label'),
  commentLabel: document.querySelector('.comment-label'),
};

// function validateEmail(email) {
//   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return emailPattern.test(email);
// }
// refs.emailInp.addEventListener('change', e => {
//   if (!emailPattern.test(email)) {
//     refs.emailStatus.textContent = 'Invalid email, try again';
//     refs.emailStatus.classList.remove('valid');
//     refs.emailStatus.classList.add('invalid');
//     refs.emailInp.style.borderColor = 'red';
//     return;
//   } else {
//     refs.emailStatus.textContent = 'Success!';
//     refs.emailStatus.classList.remove('invalid');
//     refs.emailStatus.classList.add('valid');
//     refs.emailInp.style.borderColor = 'green';
//   }
// });
//   if (validateEmail(e.target.value)) {
//     refs.emailStatus.classList.add('success');
//     refs.emailStatus.classList.remove('invalid');
//     refs.emailLabel.style.borderBottom = '1px solid #3cbc81';
//   } else {
//     refs.emailStatus.classList.add('invalid');
//     refs.emailLabel.style.borderBottom = '1px solid #e74a3b';
//   }
// });
// refs.emailInp.addEventListener('input', e => {
//   truncateText(e.target, refs.emailLabel);
// });
// refs.commentInp.addEventListener('input', e => {
//   truncateText(e.target, refs.commentLabel);
// });

refs.footerForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const email = event.target.elements.email.value.trim();
  const comment = event.target.elements.comment.value.trim();

  const data = {
    email: email,
    comment: comment,
  };
  if (!email || !comment) {
    iziToast.error({
      title: 'Error',
      message: 'All form fields must be filled in',
      position: 'topCenter',
      closeOnClick: true,
    });
    return;
  } else {
    console.log(data);
    axios
      .post('https://portfolio-js.b.goit.study/api/requests', data)
      .then(response => {
        console.log('data sended');
        modalFooter.show();
        document.querySelector('.modal-close').addEventListener('click', e => {
          modalFooter.close();
        });
        refs.footerForm.reset();
      })
      .catch(error => {
        console.error('data send fail');
      });
  }
}

const emailInput = document.querySelector('#email');
const message = document.createElement('p');
message.style.color = 'red';
emailInput.insertAdjacentElement('afterend', message);

emailInput.addEventListener('input', () => {
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(emailValue)) {
    message.textContent = 'Invalid email, try again';
    emailInput.style.borderColor = 'red';
  } else {
    message.textContent = 'Success!';
    message.style.color = 'green';
    emailInput.style.borderColor = 'green';
  }
});

function truncateText(input, label) {
  // Визначаємо ширину input
  const inputWidth = input.clientWidth; // Отримуємо ширину input в пікселях
  const avgCharWidth = 7; // Середня ширина одного символу (можна підлаштувати)
  // Розраховуємо максимальну кількість символів, які вміщуються в input
  const maxLength = Math.floor(inputWidth / avgCharWidth);
  let text = input.value;
  if (text.length > maxLength) {
    label.querySelector('.dots').textContent = '...';
  } else {
    label.querySelector('.dots').textContent = ' ';
  }
}

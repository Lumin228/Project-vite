const footerEmail = document.querySelector('#email');
const message = document.querySelector('.message');
const checkStatus = document.querySelector('.check-status');

footerEmail.addEventListener('input', function () {
  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const isValid = emailPattern.test(this.value);

  this.classList.toggle('success', isValid);
  this.classList.toggle('error', !isValid);

  checkStatus.classList.toggle('success', isValid);
  checkStatus.classList.toggle('error', !isValid);

  message.textContent = isValid ? 'Success!' : 'Invalid email, try again';
  message.classList.toggle('success-message', isValid);
  message.classList.toggle('error-message', !isValid);
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.footer-form');
  const modal = document.querySelector('.backdrop');
  const closeModalBtn = document.querySelector('.modal-close');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      email: formData.get('email'),
      message: formData.get('text'),
    };

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Помилка відправки. Спробуйте ще раз.');
      }

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      form.reset();
    } catch (error) {
      alert(error.message);
    }
  });

  closeModalBtn.addEventListener('click', function () {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
});

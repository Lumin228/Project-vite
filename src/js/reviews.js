import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const reviewRefs = {
  container: document.querySelector('.js-reviews-list'),
};

export async function getReviews() {
  try {
    const res = await axios.get(
      'https://portfolio-js.b.goit.study/api/reviews'
    );
    console.log(res);
    console.log(res.data);
    if (res.data.length === 0) {
      throw new Error('No Reviews');
    }
    return {
      reviews: res.data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

function reviewTemplate(review) {
  return `<li class="reviews-item swiper-slide">
    <img
      class="reviews-image"
      src="${review.avatar_url}"
      alt="reviever photo"
    />
    <h3 class="reviews-name">${review.author}</h3>
    <p class="reviews-text">${review.review}</p>
</li>`;
}
console.log(reviewTemplate);

function reviewSTemplate(reviews) {
  return reviews.map(reviewTemplate).join('');
}

function renderReviews(reviews) {
  const markup = reviewSTemplate(reviews);
  reviewRefs.container.insertAdjacentHTML('beforeend', markup);
}

getReviews()
  .then(({ reviews }) => {
    renderReviews(reviews);
    console.log(reviews);
  })
  .catch(error => console.error('Handled error', error));

// !=====================================================

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 16,
  modules: [Navigation, Pagination],
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // when window width is >= 1440px
    1440: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
  },
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
});
const swiperr = document.querySelector('.swiper').swiper;

swiperr.slideNext();

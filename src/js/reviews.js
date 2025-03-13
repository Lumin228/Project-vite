import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
function renderNotFound() {
  reviewRefs.container.innerHTML = `<p class="reviews-notfound">Not found</p>`;
}

getReviews()
  .then(({ reviews }) => {
    renderReviews(reviews);
    console.log(reviews);
  })
  .catch(error => {
    renderNotFound();
    const revievFailed = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          iziToast.error({
            title: 'Error',
            message: `Failed to load reviews. Please try again later.`,
            position: 'topCenter',
            closeOnClick: true,
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revievFailed, {
      root: null,
      threshold: 0.1,
    });

    observer.observe(reviewRefs.container);
  });

// !=====================================================

const swiper = new Swiper('.reviews-swiper', {
  slidesPerView: 1,
  spaceBetween: 16,
  autoHeight: false,
  simulateTouch: true,
  slideToClickedSlide: true,
  modules: [Navigation, Pagination, Keyboard],
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
    nextEl: '.reviews-swiper-next',
    prevEl: '.reviews-swiper-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    invert: false,
  },
  grabCursor: true,
});

swiper.slideNext();

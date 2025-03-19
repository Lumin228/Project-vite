import imgRectangle12 from '../img/covers/Rectangle_12.jpg';
import imgRectangle12_x2 from '../img/covers/Rectangle_12_x2.jpg';
import imgRectangle12_m_x2 from '../img/covers/Rectangle_12_m_x2.jpg';
import imgRectangle12_m from '../img/covers/Rectangle_12_m.jpg';

import imgRectangle11 from '../img/covers/Rectangle_11.jpg';
import imgRectangle11_x2 from '../img/covers/Rectangle_11_x2.jpg';
import imgRectangle11_m_x2 from '../img/covers/Rectangle_11_m_x2.jpg';
import imgRectangle11_m from '../img/covers/Rectangle_11_m.jpg';

import imgRectangle10 from '../img/covers/Rectangle_10.jpg';
import imgRectangle10_x2 from '../img/covers/Rectangle_10_x2.jpg';
import imgRectangle10_m_x2 from '../img/covers/Rectangle_10_m_x2.jpg';
import imgRectangle10_m from '../img/covers/Rectangle_10_m.jpg';

import imgRectangle9 from '../img/covers/Rectangle_9.jpg';
import imgRectangle9_x2 from '../img/covers/Rectangle_9_x2.jpg';
import imgRectangle9_m_x2 from '../img/covers/Rectangle_9_m_x2.jpg';
import imgRectangle9_m from '../img/covers/Rectangle_9_m.jpg';

import imgRectangle8 from '../img/covers/Rectangle_8.jpg';
import imgRectangle8_x2 from '../img/covers/Rectangle_8_x2.jpg';
import imgRectangle8_m_x2 from '../img/covers/Rectangle_8_m_x2.jpg';
import imgRectangle8_m from '../img/covers/Rectangle_8_m.jpg';

import imgRectangle7 from '../img/covers/Rectangle_7.jpg';
import imgRectangle7_x2 from '../img/covers/Rectangle_7_x2.jpg';
import imgRectangle7_m_x2 from '../img/covers/Rectangle_7_m_x2.jpg';
import imgRectangle7_m from '../img/covers/Rectangle_7_m.jpg';

import imgRectangle6 from '../img/covers/Rectangle_6.jpg';
import imgRectangle6_x2 from '../img/covers/Rectangle_6_x2.jpg';
import imgRectangle6_m_x2 from '../img/covers/Rectangle_6_m_x2.jpg';
import imgRectangle6_m from '../img/covers/Rectangle_6_m.jpg';

import imgRectangle5 from '../img/covers/Rectangle_5.jpg';
import imgRectangle5_x2 from '../img/covers/Rectangle_5_x2.jpg';
import imgRectangle5_m_x2 from '../img/covers/Rectangle_5_m_x2.jpg';
import imgRectangle5_m from '../img/covers/Rectangle_5_m.jpg';

import imgRectangle4 from '../img/covers/Rectangle_4.jpg';
import imgRectangle4_x2 from '../img/covers/Rectangle_4_x2.jpg';
import imgRectangle4_m_x2 from '../img/covers/Rectangle_4_m_x2.jpg';
import imgRectangle4_m from '../img/covers/Rectangle_4_m.jpg';

import imgFirstScreen1 from '../img/covers/first_screen_1.jpg';
import imgFirstScreen1_x2 from '../img/covers/first_screen_1_x2.jpg';
import imgFirstScreen1_m_x2 from '../img/covers/first_screen_1_m_x2.jpg';
import imgFirstScreen1_m from '../img/covers/first_screen_1_m.jpg';

const images = [
  {
    default: imgRectangle12,
    x2: imgRectangle12_x2,
    m_x2: imgRectangle12_m_x2,
    m: imgRectangle12_m,
  },
  {
    default: imgRectangle11,
    x2: imgRectangle11_x2,
    m_x2: imgRectangle11_m_x2,
    m: imgRectangle11_m,
  },
  {
    default: imgRectangle10,
    x2: imgRectangle10_x2,
    m_x2: imgRectangle10_m_x2,
    m: imgRectangle10_m,
  },
  {
    default: imgRectangle9,
    x2: imgRectangle9_x2,
    m_x2: imgRectangle9_m_x2,
    m: imgRectangle9_m,
  },
  {
    default: imgRectangle8,
    x2: imgRectangle8_x2,
    m_x2: imgRectangle8_m_x2,
    m: imgRectangle8_m,
  },
  {
    default: imgRectangle7,
    x2: imgRectangle7_x2,
    m_x2: imgRectangle7_m_x2,
    m: imgRectangle7_m,
  },
  {
    default: imgRectangle6,
    x2: imgRectangle6_x2,
    m_x2: imgRectangle6_m_x2,
    m: imgRectangle6_m,
  },
  {
    default: imgRectangle5,
    x2: imgRectangle5_x2,
    m_x2: imgRectangle5_m_x2,
    m: imgRectangle5_m,
  },
  {
    default: imgRectangle4,
    x2: imgRectangle4_x2,
    m_x2: imgRectangle4_m_x2,
    m: imgRectangle4_m,
  },
  {
    default: imgFirstScreen1,
    x2: imgFirstScreen1_x2,
    m_x2: imgFirstScreen1_m_x2,
    m: imgFirstScreen1_m,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const marqueeContainers = document.querySelectorAll('.marquee__inner');

  function getImageType() {
    if (window.innerWidth <= 480) return 'm';
    if (window.innerWidth <= 768) return 'm_x2';
    return 'x2';
  }

  function populateMarquee() {
    marqueeContainers.forEach(container => {
      container.innerHTML = '';
      const shuffledImages = [...images].sort(() => Math.random() - 0.5);

      const type = getImageType();

      shuffledImages.forEach(imgObj => {
        const imgPath = imgObj[type] || imgObj.default;

        const imageElement = document.createElement('img');
        imageElement.classList.add('marquee__line');
        imageElement.src = imgPath;
        imageElement.alt = imgPath.split('/').pop().split('.')[0];
        container.appendChild(imageElement);
      });
    });
  }

  const coversSection = document.getElementById('covers');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.25) {
          document.querySelectorAll('.marquee__line').forEach(line => {
            line.style.animationPlayState = 'running';
          });
        } else {
          document.querySelectorAll('.marquee__line').forEach(line => {
            line.style.animationPlayState = 'paused';
          });
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(coversSection);
  populateMarquee();
  window.addEventListener('resize', populateMarquee);
});

document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.menu-btn');
  const headerNav = document.querySelector('.header__nav');
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu a');

  menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    headerNav.classList.toggle('active');
  });

  document.addEventListener('click', e => {
    if (!headerNav.contains(e.target) && !menuBtn.contains(e.target)) {
      headerNav.classList.remove('active');
    }
  });

  burgerMenu.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    });
  });
});

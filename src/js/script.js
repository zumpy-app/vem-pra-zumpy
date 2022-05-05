const navMenu = document.querySelector('[data-js="nav-menu"]');
const navLinksList = document.querySelector('[data-js="nav-links-list"]');
const toggleMobileMenuBtn = document.querySelector(
  '[data-js="toggle-mobile-menu-btn"]'
);

const toggleMobileMenu = () => {
  const mobileMenuIcon = document.querySelector('[data-js="mobile-menu-icon"]');

  navMenu.classList.toggle('nav__menu--display');

  navMenu.classList.contains('nav__menu--display')
    ? (mobileMenuIcon.classList = 'uil uil-multiply')
    : (mobileMenuIcon.classList = 'uil uil-bars');
};

toggleMobileMenuBtn.addEventListener('click', toggleMobileMenu);

const closeMobileMenuOnLinkClick = (event) => {
  const menuElement = event.target;

  if (
    menuElement.classList.contains('nav__link') &&
    navMenu.classList.contains('nav__menu--display')
  )
    toggleMobileMenu();
};

navLinksList.addEventListener('click', closeMobileMenuOnLinkClick);

const allPageNavLinks = document.querySelectorAll('.nav__link');

const currentNavLink = (link) => {
  allPageNavLinks.forEach((element) => {
    element.classList.remove('nav__link--current');
  });

  link.classList.add('nav__link--current');
};

allPageNavLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const element = event.target;
    currentNavLink(element);
  });
});


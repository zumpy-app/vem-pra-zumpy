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

const toggleSearchBarBtn = document.querySelector(
  '[data-js="toggle-search-bar"]'
);

const searchTopicForm = document.querySelector('[data-js="search-form"]');
const input = searchTopicForm.querySelector('input');

const toggleSearchBar = () => {
  searchTopicForm.classList.toggle('nav__search--display');

  if (searchTopicForm.classList.contains('nav__search--display')) {
    input.focus();
  }
};

toggleSearchBarBtn.addEventListener('click', toggleSearchBar);

const searchTopic = (topic) => {
  console.log(topic);
};

searchTopicForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const topic = input.value;
  searchTopic(topic);
  topic.value = '';

});

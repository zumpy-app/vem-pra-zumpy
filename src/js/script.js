// [SEARCH TOPIC FILE]==========================================================
const createDOMElement = (elementTag, attributes) => {
  const element = document.createElement(elementTag);
  const attributesArray = Object.entries(attributes);

  attributesArray.forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

const displayTopic = (path) => {
  const topicContainer = document.querySelector('[data-js="topics-container"]');

  const filePath = `/content/${path}`;

  const styleTag = createDOMElement('link', {
    rel: 'stylesheet',
    href: '/src/css/markdown-styles.css',
  });
  const templateTag = createDOMElement('template', {});
  const content = createDOMElement('zero-md', { src: filePath });

  templateTag.appendChild(styleTag);
  content.appendChild(templateTag);

  topicContainer.innerText = '';
  topicContainer.appendChild(content);
};

const checkTopic = (tags, words) => {
  for (const word of words) {
    if (!tags.includes(word)) {
      return false;
    }
  }

  return true;
};

const findTopics = async (inputValue) => {
  const response = await fetch('./content/tags.json');
  const data = await response.json();

  if (inputValue === 'default') {
    displayTopic(data.default);
    return;
  }

  const helpTopics = data.topics;
  const userSearchWords = inputValue.split(/[ ]+/);

  let topicToDisplay = null;

  for (const topic of helpTopics) {
    const topicoBate = checkTopic(topic.tags, userSearchWords);

    if (!topicoBate) continue;
    topicToDisplay = topic;
  }

  if (!topicToDisplay) {
    displayTopic('topics/not-found.md');
    return;
  }

  const topicToDisplayPath = topicToDisplay.file;
  const currentButtonID = topicToDisplayPath.substring(
    topicToDisplayPath.indexOf('/') + 1,
    topicToDisplayPath.indexOf('.')
  );
  const currentButton = document.querySelector(`#${currentButtonID}`);

  displayTopic(topicToDisplayPath);
  currentNavLink(currentButton);
};

// [NAV MENU]===================================================================
const navMenu = document.querySelector('[data-js="nav-menu"]');
const allPageNavLinks = document.querySelectorAll('.nav__link');
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

const currentNavLink = (navLink) => {
  allPageNavLinks.forEach((link) => {
    link.classList.remove('nav__link--current');
  });

  navLink.classList.add('nav__link--current');
};

allPageNavLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const currentLink = event.target;

    currentNavLink(currentLink);
    toggleMobileMenu();

    const linkID = currentLink.id;
    displayTopic(`topics/${linkID}.md`);
  });
});

// [SEARCH TOPIC FORM]==========================================================
const searchForm = document.forms.searchForm;
const searchTopicInpt = searchForm.searchTopicInpt;

const toggleSearchBarBtn = document.querySelector(
  '[data-js="toggle-search-bar-btn"]'
);

const toggleSearchBar = () => {
  searchForm.classList.toggle('nav__search--display');

  if (navMenu.classList.contains('nav__menu--display')) toggleMobileMenu();
};

toggleSearchBarBtn.addEventListener('click', toggleSearchBar);

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let inputValue = searchTopicInpt.value;
  if (inputValue) findTopics(inputValue.toLowerCase());

  toggleSearchBar();
  searchTopicInpt.value = '';
});

window.addEventListener('load', () => {
  findTopics('default');
});

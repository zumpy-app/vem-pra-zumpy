// Nav Menu
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
    toggleMobileMenu();
  });
});

// Search topic
const tagsURL = './content/tags.json';
const topicsURL = './content/topics';

const displayTopic = (filePath) => {
  const topicContainer = document.querySelector('[data-js="topics-container"]');

  // Usar zero-md aqui
  topicContainer.innerText = filePath;
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
  const response = await fetch(tagsURL);
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
    displayTopic('oops'); // not-found.md
    return;
  }

  displayTopic(topicToDisplay.file);
};

// Search Topic Form
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

/*
Quando a pagina carregar, chamar direto a função de display com o 
para exibir o sobre toda vez que abrir o site

se nao encontrar topico, exibir tela de topico nao encontrado com um "ooops"
e um svg triste
enviar ideia de topico, sla
*/

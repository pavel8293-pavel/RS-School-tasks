/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { cards } from './cards.js';
import {
  switchCategory, createGameCards, play, playModeToggle, playButton,
} from './script.js';
import showStats from './stats.js';
import { deleteCurrentCards } from './commonFunctions.js';

let startGameSwitcher = false;
let burgerMenu;
let blockedScreen;
let menuList;
const burgerLogo = document.querySelector('.toggle-icon');

class DOMelement {
  constructor(tagName = 'div', selector, className = '', inner = '', event, callback) {
    const el = document.createElement(tagName);
    document.querySelectorAll(selector).forEach((item) => { item.append(el); });
    el.className = className;
    el.innerHTML = inner;
    el.addEventListener(event, callback);
    this.node = el;
  }
}

function toggleBurgerMenuStyle() {
  burgerLogo.classList.toggle('pushed');
  burgerMenu.classList.toggle('burger-menu-visible');
  blockedScreen.classList.toggle('empty-screen');
  // eslint-disable-next-line no-unused-expressions
  menuList.classList.contains('menu-list')
    ? (menuList.classList.add('menu-list-hidden'), menuList.classList.remove('menu-list'))
    : (menuList.classList.remove('menu-list-hidden'), menuList.classList.add('menu-list'));
}
burgerLogo.addEventListener('click', toggleBurgerMenuStyle);
blockedScreen = new DOMelement('div', 'body', 'hidden-container', undefined, 'click', toggleBurgerMenuStyle);
burgerMenu = new DOMelement('div', 'body', 'hidden-block', undefined);
menuList = new DOMelement('ul', '.hidden-block', 'menu-list-hidden', undefined);

function createBurgerMenuItem(text) {
  const burgerMenuItem = new DOMelement('li', 'ul', 'menu-item', text);
  return burgerMenuItem;
}
function BurgerMenuToggle(e) {
  cards[0].forEach((topic, index) => {
    if (e.target.innerHTML === topic) {
      switchCategory(index);
      toggleBurgerMenuStyle();
      startGameSwitcher = false;
    }
  });
  if (e.target.innerHTML === 'English for kids') {
    playModeToggle();
    deleteCurrentCards();
    toggleBurgerMenuStyle();
    cards[0].forEach((mainTopics) => {
      createGameCards(mainTopics);
      startGameSwitcher = false;

      playButton.classList.remove('repeat-word', 'start-game');
      if (play.playMode) { playButton.classList.remove('repeat-word', 'start-game'); }
    });
  } else if (e.target.innerHTML === 'Results') {
    showStats();
  }
}

createBurgerMenuItem('English for kids');
cards[0].forEach((mainTopics) => {
  createBurgerMenuItem(mainTopics);
});
createBurgerMenuItem('Results');

menuList.addEventListener('click', (e) => {
  BurgerMenuToggle(e);
});
export const GameSwitcher = {
  startGameSwitcher: false,
};

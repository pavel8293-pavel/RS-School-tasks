/* eslint-disable import/no-cycle */
import { cards } from './cards.js';
import audioPlay from './audioPlay.js';
import { deleteCurrentCards, findTranslatedWord, translatedWord } from './commonFunctions.js';
import { GameSwitcher } from './burgerMenu.js';
import './style.css';

const switchMode = document.querySelector('.switch-btn');
const reverseBtn = document.createElement('button');
const field = document.querySelector('.topics-field');
let matchedWord;
let wordsForPlay = [];
let scoreCounter = 1;
let cardsfrontSide;
let cardsbackSide;
let card;
let currentWordsInCard = [];
// eslint-disable-next-line import/no-mutable-exports
let currentProgress = [];
let playMode = false;
reverseBtn.className = 'reverse-button';
switchMode.innerHTML = 'train';

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

const playButton = new DOMelement('button', '.main-wrapper', 'hidden-class', 'START GAME', 'click', () => {
  startGame(GameSwitcher.startGameSwitcher, wordsForPlay);
});
const scoreTable = new DOMelement('div', '.main-wrapper', 'score-table');
field.addEventListener('click', (event) => {
  checkWord(event, wordsForPlay, GameSwitcher.startGameSwitcher);
});

switchMode.addEventListener('click', playModeToggle);
function playModeToggle() {
  const topic = field.children[0].textContent;
  if (topic !== cards[0][0]) { playButton.classList.toggle('start-game'); }
  switchMode.classList.toggle('switch-on');
  if (switchMode.classList.contains('switch-on')) {
    playMode = true;
    switchMode.innerHTML = '  play';
    for (let i = 0; i < field.children.length; i += 1) {
      if (topic !== cards[0][0]) {
        field.children[i].children[1].textContent = ' ';
        wordsForPlay = currentWordsInCard.slice();
        currentProgress = [];
      }
    }
  } else {
    for (let i = 0; i < field.children.length; i += 1) {
      if (topic !== cards[0][0]) {
        field.children[i].children[1].innerHTML = `<button class="reverse-button">&#8635;</button>${currentWordsInCard[i]}`;
      }
      if (field.children[i].className === 'card disabled-area') { field.children[i].className = 'card'; }
    }
    playMode = false;
    switchMode.innerHTML = 'train';
    GameSwitcher.startGameSwitcher = false;
    currentProgress = [];
    scoreTable.innerHTML = '';
    playButton.classList.remove('repeat-word', 'start-game');
    playButton.innerHTML = 'START GAME';
  }
}

cards[0].forEach((mainTopics) => {
  createGameCards(mainTopics);
});

field.addEventListener('click', (e) => {
  cards[0].forEach((topic, index) => {
    if (e.target.innerHTML === topic) {
      switchCategory(index);
    }
  });
});

function switchCategory(index) {
  deleteCurrentCards();
  if (playMode) { playButton.classList.add('start-game'); }
  currentWordsInCard = [];
  wordsForPlay = [];
  cards[index + 1].forEach((topic) => {
    createGameCards(topic.word);
    if (!playMode) {
      cardsfrontSide.innerHTML = topic.word;
      cardsfrontSide.insertAdjacentHTML('afterbegin', '<button class="reverse-button">&#8635;</button>');
    } else {
      cardsfrontSide.innerHTML = '';
    }
    cardsbackSide.addEventListener('mouseleave', (e) => {
      if (e.target.className === 'back-side') {
        e.path[1].classList.toggle('is-flipped');
        e.target.nextSibling.innerHTML = `<button class="reverse-button">&#8635;</button>${topic.word}`;
      }
    });
  });
}

field.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    e.path[2].classList.toggle('is-flipped');
    findTranslatedWord(e.path[1].innerText.slice(2));
    e.target.parentNode.previousSibling.innerText = translatedWord;
    e.target.classList.toggle('disabled-area');
  }
  if (e.target.className !== 'topics-field' && e.target.firstElementChild !== null) {
    findTranslatedWord(e.target.innerText.slice(1));
    audioPlay(e.target.innerText.slice(2));
  }
});

function createGameCards(mainTopics) {
  currentWordsInCard.push(mainTopics);
  wordsForPlay.push(mainTopics);
  card = document.createElement('div');
  card.className = 'card';
  field.append(card);
  cardsfrontSide = new DOMelement('div', '.card', 'front-side', mainTopics);
  cardsbackSide = document.createElement('div');
  card.prepend(cardsbackSide);
  cardsbackSide.className = 'back-side';
  cardsfrontSide.style.backgroundImage = `url(../assets/img/${mainTopics}.jpg)`;
  cardsbackSide.style.backgroundImage = `url(../assets/img/${mainTopics}.jpg)`;
}

function startGame(startPlayStatus, randomSortedWords) {
  playButton.classList.add('repeat-word');
  playButton.innerHTML = 'REPEAT';
  if (randomSortedWords.length > 0) {
    if (!startPlayStatus) {
      randomSortedWords.sort(() => Math.random() - 0.5);
      // eslint-disable-next-line no-param-reassign
      startPlayStatus = true;
      matchedWord = new RegExp(`${randomSortedWords[0]}`, 'g');
      if (randomSortedWords[0] !== 'Action') {
        setTimeout(audioPlay, 650, randomSortedWords[0]);
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      randomSortedWords[0] !== 'Action' ? audioPlay(randomSortedWords[0]) : false;
    }
    GameSwitcher.startGameSwitcher = startPlayStatus;
    wordsForPlay = randomSortedWords;
  } else {
    gameOver();
  }
}

function checkWord(event, randomedArray, startPlayStatus) {
  const result = event.target.outerHTML.match(matchedWord);
  const divClass = event.target.className;
  if (startPlayStatus && result !== null && divClass !== 'topics-field') {
    event.target.parentNode.classList.toggle('disabled-area');
    randomedArray.splice(0, 1);
    GameSwitcher.startGameSwitcher = false;
    startGame(GameSwitcher.startGameSwitcher, randomedArray);
    if (GameSwitcher.startGameSwitcher && divClass !== 'topics-field') {
      cards.slice(1, cards.length - 1).forEach((item) => {
        item.forEach((value) => {
          if (value.word === result.toString()) {
            value.right += 1;
            value.wrong += 1;
          }
        });
      });
      countScore('<img src=\'../assets/img/succeed.png\' alt=\'success\'>');
    }
    audioPlay('succeed');
  } else if (GameSwitcher.startGameSwitcher && divClass !== 'topics-field') {
    cards.slice(1, cards.length - 1).forEach((item) => {
      item.forEach((value) => {
        if (value.word.match(matchedWord)) {
          value.wrong += 1;
        }
      });
    });
    countScore('<img src=\'../assets/img/fail.png\' alt=\'fail\'>');
    audioPlay('fail');
  }
}

function gameOver() {
  showFinalScreen();
  scoreCounter = 1;
  GameSwitcher.startGameSwitcher = false;
  playMode = false;
  switchMode.classList.toggle('switch-on');
  playButton.classList.remove('start-game', 'repeat-word');
  playButton.innerHTML = 'START GAME';
  deleteCurrentCards();
  cards[0].forEach((mainTopics) => {
    createGameCards(mainTopics);
    currentProgress = [];
    scoreTable.innerHTML = '';
  });
}

function showFinalScreen() {
  let finalScreen;
  if (scoreCounter === currentWordsInCard.length) {
    finalScreen = new DOMelement('div', 'body', 'final-screen', '<img src=\'../assets/img/success.png\' alt=\'success\'>');
    audioPlay('success');
  } else {
    finalScreen = new DOMelement('div', 'body', 'final-screen', '<img src=\'../assets/img/failure.png\' alt=\'failure\'>');
    audioPlay('failure');
  }
  setTimeout(() => {
    finalScreen.classList.remove('final-screen');
    finalScreen.remove();
  }, 3000);
}
function countScore(image) {
  scoreCounter += 1;
  currentProgress.unshift(image);
  scoreTable.innerHTML = currentProgress.reduce((a, b) => a + b);
}

export {
  switchCategory, createGameCards, playModeToggle, playButton, switchMode, currentProgress,
};
export const play = {
  playMode,
};

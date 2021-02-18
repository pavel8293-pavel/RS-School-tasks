import { cards } from './cards.js';

const topicsArray = [...cards[0]];
Object.prototype.fillUpElement = function (selector, cssClass, inner, event, callback) {
  document.querySelectorAll(selector).forEach((item) => {
    item.append(this);
  });
  this.className = cssClass;
  this.innerHTML = inner;
  this.addEventListener(event, callback);
};
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

function clearLocalStorage() {
  setLocalStorage([0, 0, 0]);
  createTable();
}

function checkTableValueIfNull(item) {
  if (item == null) {
    return 0;
  }
  return item;
}

function setLocalStorage(array) {
  topicsArray.forEach((item, index) => {
    cards[index + 1].forEach((value) => {
      localStorage.setObj(value.word, array || [value.counter, value.right, value.wrong]);
    });
  });
}

function countWinRate(item) {
  let result = 0;
  const firstNum = Number(localStorage.getObj(item)[1]) || 0;
  const secondNum = Number(localStorage.getObj(item)[2]) || 0;
  const succeedPercent = firstNum / secondNum * 100;
  if (isNaN(succeedPercent)) {
    result = 0;
  } else if (!isFinite(succeedPercent)) {
    result = 100;
  } else {
    result = succeedPercent;
  }

  return result.toFixed(0);
}

function createTable() {
  if (document.querySelector('table')) { document.querySelector('table').remove(); }
  const statistic = document.createElement('table');
  const resetBtn = document.createElement('button');
  const closeBtn = document.createElement('button');
  let tableTopicRow;
  let tableRow;
  const tableHeadRow = document.createElement('tr');
  document.querySelector('body').append(statistic);
  resetBtn.fillUpElement('table', 'reset-button', 'RESET', 'click', clearLocalStorage);
  closeBtn.fillUpElement('table', 'close-btn', '[X]', 'click', () => { document.querySelector('table').className = 'hidden-class'; });
  tableHeadRow.fillUpElement('table', 'table-head', '<th>№</th><th>Word</th><th>Translation</th><th>Number of clicks</th><th>Correct clicks</th><th>Wrong clicks</th><th>Win rate</th>');
  topicsArray.forEach((item, index) => {
    tableTopicRow = document.createElement('tr');
    tableTopicRow.fillUpElement('table', 'table-topic', `<td></td><td>${item}</td><td></td><td></td><td></td><td></td><td></td>`);
    cards[index + 1].forEach((value, number) => {
      tableRow = document.createElement('tr');
      tableRow.fillUpElement('table', 'table-row', `<td>${number + 1}</td><td>${value.word}</td><td>${value.translation}</td><td>${checkTableValueIfNull(localStorage.getObj(value.word)[0])}</td><td>${checkTableValueIfNull(localStorage.getObj(value.word)[1])}</td><td>${checkTableValueIfNull(localStorage.getObj(value.word)[2])}</td><td>${countWinRate(value.word)}%</td>`);
    });
  });
}
function showStats() {
  setLocalStorage();
  createTable();
}

document.querySelector('.topics-field').addEventListener('click', (e) => {
  if (!topicsArray.includes(e.target.innerText)) {
    setLocalStorage();
  }
  topicsArray.forEach((item, index) => {
    cards[index + 1].forEach((value) => {
      if (e.target.innerText.slice(2, e.target.innerText.length) === value.word) {
        localStorage.getObj(value.word);
        value.counter += 1;
      }
    });
  });
});

export default showStats;

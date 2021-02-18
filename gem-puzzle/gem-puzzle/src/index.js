import './style.css';
import image from './38.jpg';
import click from './click3.mp3';

const body = document.querySelector('body');
const wrapper = document.createElement('div');
const currentScoreBlock = document.createElement('div');
const menuNavBar = document.createElement('div');
const gameField = document.createElement('div');
const saveButton = document.createElement('button');
const loadButton = document.createElement('button');
const playButton = document.createElement('button');
const congrats = document.createElement('div');
const selectFieldSize = document.createElement('select');
const textLabel = document.createElement('label');
const voiceSwitcher = document.createElement('button');
let fieldSize = document.createElement('option');
const audio = document.createElement('audio');
const source = document.createElement('source');
const currentScore = document.createElement('div');
const currentTime = document.createElement('div');

let counter = 0;
congrats.className = 'congrats';
wrapper.className = 'wrapper';
currentScore.innerHTML = `Score: ${counter}`;
let secondsValue = 0;
let minutValue = 0;
let temporaryArray = [];
let isFinishedArray = [];
const bestResults = {};

currentTime.innerHTML = ` time: ${minutValue}m ${secondsValue}s `;
source.src = `${click}`;
source.type = 'audio/mpeg';
audio.id = 'keyAudioLang';
selectFieldSize.className = 'selectFieldSize';
textLabel.className = 'textLabel';
menuNavBar.className = 'menuNavBar';
gameField.className = 'gameField';
gameField.innerHTML = '';
textLabel.innerHTML = 'Choose size: ';
voiceSwitcher.innerHTML = 'Mute';
saveButton.innerHTML = 'Save';
loadButton.innerHTML = 'Load';
playButton.innerHTML = 'play';
currentScore.className = 'currentScore';
currentScoreBlock.className = 'currentScoreBlock';
playButton.type = 'submit';
saveButton.className = 'buttons';
voiceSwitcher.className = 'buttons';
loadButton.className = 'buttons';
playButton.className = 'buttons';

body.append(wrapper);
wrapper.append(menuNavBar);
wrapper.append(currentScoreBlock);
wrapper.append(gameField);
menuNavBar.append(textLabel);
menuNavBar.append(selectFieldSize);
menuNavBar.append(playButton);
currentScoreBlock.append(currentScore);
currentScoreBlock.append(currentTime);
menuNavBar.append(voiceSwitcher);
selectFieldSize.append(fieldSize);
body.append(audio);
audio.append(source);
menuNavBar.append(saveButton);
menuNavBar.append(loadButton);

const keyAudioLang = document.getElementById('keyAudioLang');

let voicer = true;

const gameFieldWidth = 300;
let cellSize;
let cell;
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
let cells = [];
let empty;
let timer;

fieldSize.innerHTML = 'Size';
for (let i = 3; i <= 8; i += 1) {
  fieldSize = document.createElement('option');
  fieldSize.value = i;
  fieldSize.innerHTML = `${i} x ${i}`;
  selectFieldSize.append(fieldSize);
}
playButton.addEventListener('click', () => {
  gameFieldSize(selectFieldSize.value);
  clearTimeout(timer);
  counter = 0;
  secondsValue = 0;
  minutValue = 0;
  currentTime.innerHTML = ` time: ${minutValue}m ${secondsValue}s `;
  if (counter === 1) {
    timer = setInterval(() => {
      secondsValue += 1;
      if (secondsValue === 60) {
        secondsValue = 0;
        minutValue += 1;
      }
      currentTime.innerHTML = ` time: ${minutValue}m ${secondsValue}s `;
    }, 1000);
  }
  currentScore.innerHTML = `Score: ${counter}`;
});
voiceSwitcher.addEventListener('click', voiceSwitcherFunc);
saveButton.addEventListener('click', saveFunc);
loadButton.addEventListener('click', loadFunc);

function gameFieldSize(value) {
  while (gameField.firstChild) {
    gameField.removeChild(gameField.firstChild);
  }
  if (value === 'Size') {
    arrSort();
  } else {
    if (gameField.contains(congrats)) {
      congrats.remove();
    }
    cells = [];
    numbers = [];
    for (let i = 0; i < value ** 2; i += 1) {
      numbers.push(i);
    }
    arrSort();
  }
}
function move(index) {
  counter += 1;
  if (counter === 0) {
    secondsValue = 0;
    minutValue = 0;
  } else if (counter === 1) {
    timer = setInterval(() => {
      secondsValue += 1;
      if (secondsValue === 60) {
        secondsValue = 0;
        minutValue += 1;
      }
      currentTime.innerHTML = `time: ${minutValue}m ${secondsValue}s `;
    }, 1000);
  }
  currentScore.innerHTML = `Score: ${counter}`;
  if (voicer === true) { keyAudioLang.play(); }
  cell = cells[index];

  // Проверяем можем ли мы двигать ячейку
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);
  if (leftDiff + topDiff === 1) {
    for (let i = 0; i < temporaryArray.length; i += 1) {
      const tempVal = cell.value;
      if (temporaryArray[i] === 0) {
        temporaryArray[i] = tempVal;
      } else if (temporaryArray[i] === cell.value) {
        temporaryArray[i] = 0;
      }
    }
    isFinishedArray = temporaryArray;
    // меняем координать поменяных ячеек
    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;
    empty.style.left = `${cell.left * cellSize}px`;
    empty.style.top = `${cell.top * cellSize}px`;
    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
  }
  isFinishedFunc(isFinishedArray);
}
// Случайное распределение ячеек
function arrSort() {
  numbers.sort(() => Math.random() - 0.5);
  arrayCheking(numbers);
}
arrSort();
// Проверка решаемости
function arrayCheking(sortedArray) {
  let emptyRow;
  let evenOddValue;
  const newSortedArray = sortedArray.slice();
  sortedArray.forEach((num) => {
    if (sortedArray[num] === 0) {
      emptyRow = Math.trunc((num) / Math.sqrt(sortedArray.length)) + 1;
    }
  });
  sortedArray = sortedArray.filter((sortedArray) => sortedArray > 0);
  const checkingArray = [];
  checkingArray.push(sortedArray[0] - 1);
  if (sortedArray.length % 2) {
    createSolvableArray(sortedArray, checkingArray);
    evenOddValue = checkingArray.reduce((a, b) => a + b) + emptyRow; // Значение определяющее решается ли функция
    evenOddValue % 2 ? (arrSort()) : gameStart(newSortedArray); // если число нечетное - перезапускаем сортировку до тех пор пока evenOddValue не станет четным значением и запускаем игру
  } else {
    createSolvableArray(sortedArray, checkingArray);
    evenOddValue = checkingArray.reduce((a, b) => a + b); // Значение определяющее решается ли функция
    evenOddValue % 2 ? (arrSort()) : gameStart(newSortedArray); // если число нечетное - перезапускаем сортировку до тех пор пока evenOddValue не станет четным значением и запускаем игру
  }
}
// Начало игры с решаемым массивом
function gameStart(arrgameField) {
  cells = [];
  temporaryArray = arrgameField;
  cellSize = gameFieldWidth / Math.sqrt(arrgameField.length);
  for (let i = 0; i < arrgameField.length; i += 1) {
    let left;
    let top;
    if (+arrgameField[i] === 0) {
      empty = document.createElement('div');
      empty.className = 'empty';
      gameField.append(empty);
      empty.innerHTML = '    ';
      empty.left = (i) % Math.sqrt(arrgameField.length);
      empty.top = (i - empty.left) / Math.sqrt(arrgameField.length);
      empty.value = arrgameField[i];
      empty.position = i;
      empty.style.left = `${empty.left * cellSize}px`;
      empty.style.top = `${empty.top * cellSize}px`;
      empty.style.width = `${cellSize}px`;
      empty.style.height = `${cellSize}px`;

      cells.push({
        left: empty.left,
        top: empty.top,
        element: empty,
        value: +arrgameField[i],
        position: i,
      });
    } else if (+arrgameField[i] !== 0) {
      cell = document.createElement('div');
      cell.className = 'cell';

      gameField.append(cell);
      left = (i) % Math.sqrt(arrgameField.length);
      top = (i - left) / Math.sqrt(arrgameField.length);

      cell.draggable = 'true';
      cell.innerHTML = (arrgameField[i]);
      cell.style.left = `${left * cellSize}px`;
      cell.style.top = `${top * cellSize}px`;
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;

      cells.push({
        left,
        top,
        element: cell,
        value: +arrgameField[i],
        position: i,
      });
      cell.style.backgroundImage = `url(${image})`;
      cell.style.backgroundSize = '300px 300px';
      cell.style.backgroundPosition = `left -${((arrgameField[i] - 1) % 3) * cellSize}px top -${Math.trunc((+arrgameField[i] - 1) / Math.sqrt(arrgameField.length)) * cellSize}px `;
      // Добавляем обработчик
      cell.addEventListener('click', () => { move(i); });
    }
  }
}
// Проверка закончена ли игра
function isFinishedFunc(array) {
  const arr = [...array];
  const finishArray = arr.sort((a, b) => a - b).slice(1);
  const newArray = array;
  if (finishArray.join('') === newArray.slice(0, -1).join('')) {
    clearTimeout(timer);
    gameField.append(congrats);
    const sec = secondsValue + (minutValue - 1) * 60;
    congrats.innerHTML = ` Congratulations!!! Your score is ${counter}, time ${minutValue} min ${secondsValue} sec`;
    bestResults.counter = counter;
    bestResults.seconds = sec;
  }
}

// Кнопка звука
function voiceSwitcherFunc() {
  if (voicer) {
    document.querySelector('body > div > div.menuNavBar > button:nth-child(4)').style.border = '3px solid rgba(245, 15, 7, 0.698)';
    voicer = false;
  } else if (!voicer) {
    keyAudioLang.play();
    document.querySelector('body > div > div.menuNavBar > button:nth-child(4)').style.background = 'rgb(238, 236, 179)';
    document.querySelector('body > div > div.menuNavBar > button:nth-child(4)').style.border = 'none';
    voicer = true;
  }
}
function saveFunc() {
  localStorage.removeItem('saveButton');
  localStorage.removeItem('Count');
  localStorage.removeItem('Minuts');
  localStorage.removeItem('Seconds');
  localStorage.setItem('saveButton', temporaryArray);
  localStorage.setItem('Count', counter);
  localStorage.setItem('Minuts', minutValue);
  localStorage.setItem('Seconds', secondsValue);
}
// Загрузка
function loadFunc() {
  while (gameField.firstChild) {
    gameField.removeChild(gameField.firstChild);
  }
  if (gameField.contains(congrats)) {
    congrats.remove();
  }
  let tempArr = [];
  minutValue = +localStorage.getItem('Minuts');
  secondsValue = +localStorage.getItem('Seconds');
  tempArr = localStorage.getItem('saveButton').split(',');
  for (let i = 0; i < tempArr.length; i++){
  tempArr[i] = +tempArr[i];
}
  numbers = [];
  gameStart(tempArr);
  counter = +localStorage.getItem('Count');
  currentTime.innerText = ` time: ${minutValue}m ${secondsValue}s `;
  currentScore.innerHTML = `Score: ${counter}`;
}

function createSolvableArray(sortedArray, checkingArray) {
  for (let i = 1; i < sortedArray.length; i++) {
    for (let j = 0; j < i; j++) {
      if (sortedArray[i] > sortedArray[j]) {
        sortedArray[i] -= 1;
      }
    }
    checkingArray.push(sortedArray[i] - 1);
  }
  return checkingArray;
}

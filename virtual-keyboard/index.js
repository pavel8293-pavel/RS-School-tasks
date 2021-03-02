
const buttons = document.querySelectorAll('.btn');
const name = document.querySelector('.name');
const langBtn = document.querySelector('.langBtn');
const shift__btn = document.querySelector('.shift__btn');
const caps = document.querySelector('.caps');
const BackSpace = document.querySelector('.top__btn');
const appearBtn = document.querySelector('.appear__btn');
const voice = document.querySelector('.voice');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const keyAudioRu = document.getElementById('keyAudioRu');
const keyAudioEn = document.getElementById('keyAudioEn');
const keyAudioShift = document.getElementById('keyAudioShift');
const keyAudioBackSpace = document.getElementById('keyAudioBackSpace');
const keyAudioCaps = document.getElementById('keyAudioCaps');
const keyAudioLang = document.getElementById('keyAudioLang');
const RU = document.querySelectorAll('#ru');
const EN = document.querySelectorAll('#en');
const SHIFT = document.querySelectorAll('#shift');
const UNSHIFT = document.querySelectorAll('#unShift');

let LetterNum;
let currentString;
let CurrentLetter;
let CurrentNumbe;
let appear = false;
let Voicer = true;
let Recording = true;
let state = {
  'language': 'RU',
  'shiftButton': false,
  'capsLockButton': false
}

function getData(array){
  fetch('./keys.json')
  .then(res => res.json())
  .then(list => {
    setKeys(list[array])
    })
}

// Вывод символов на виртуальную клавиатуру

function setKeys(array) {
  buttons.forEach((button) => {
    if (!state.shiftButton && state.capsLockButton) {
      return button.innerHTML = array[button.attributes[0].value].toUpperCase()
    }
    if (state.shiftButton && state.capsLockButton) {
      return button.innerHTML = array[button.attributes[0].value].toLowerCase()
    } else {
      return button.innerHTML = array[button.attributes[0].value]
    }
  })
}

function toggleLetters() {
  switch (state.language) {
    case 'RU':
      if (!state.shiftButton) getData("RU")
      if (state.shiftButton) getData("ShiftRU")
      break;
    case 'EN':
      if (!state.shiftButton) getData("EN")
      if (state.shiftButton) getData("ShiftEN")
      break;
  }
  document.querySelector(".space__btn").innerHTML = "Space"
  document.querySelector(".enter__btn").innerHTML = "Enter"
}
toggleLetters()
//Вешаем событие на виртуальные клавиши
buttons.forEach(function (num) {
  num.addEventListener('click', function (arg) {
    console.log(num)
  /*  clearProp();
    let letterNum = arg.target.attributes[0].value;
    LetterNum = letterNum;
    buttonsFunc(letterNum);*/

  });
});
let buttonsFunc = (buttons) => {
  name.focus()
  let tempLetter;
  if (state.language) {
    if (Voicer === true) { if (buttons.toString() === "13") { keyAudioLang.play() } else { keyAudioEn.play() } }
    if (state.shiftButton) {
      for (let key in arrEnShift) {
        if (buttons === key) {
          tempLetter = arrEnShift[key];
          CurrentLetter = tempLetter;
        }
      }
    } else if (!state.shiftButton) {
      for (let key in arrEn) {
        if (buttons === key) {
          tempLetter = arrEn[key];
          CurrentLetter = tempLetter;
        }
      }
    }
  } else if (!state.language) {
    if (Voicer === true) { if (buttons.toString() === "13") { keyAudioLang.play() } else { keyAudioRu.play() } }
    if (state.shiftButton) {
      for (let key in arrRuShift) {
        if (buttons === key) {
          tempLetter = arrRuShift[key];
          CurrentLetter = tempLetter;
        }
      }
    } else if (!state.shiftButton) {
      for (let key in arrRu) {
        if (buttons === key) {
          tempLetter = arrRu[key];
          CurrentLetter = tempLetter;
        }
      }
    }
  }
  curString()
}
// Выводим событие на эран
function curString() {
  let tempLetter = CurrentLetter;
  if (Caps && !Shift) {
    name.value += tempLetter.toUpperCase();
    currentString = name.value;
  }
  else if (Caps && Shift) {
    name.value += tempLetter.toLowerCase();
    currentString = name.value;
  } else if (Shift && !Caps) {
    name.value += tempLetter.toUpperCase();
    currentString = name.value;
  }
  else if (!Caps && !Shift) {
    name.value += tempLetter;
    currentString = name.value;
  }
}

//Считывание нажатия на реальной клавиатуре
function keypr(e) {
  name.focus()
  let tempLetter;
  let temp = e.keyCode.toString();
  console.log(temp)
  if (temp === "8") {
    if (Voicer === true) { keyAudioBackSpace.play(); }
    name.value = name.selectionEnd.slice(0, -1)
  } else if (temp === "16") {
    shiftFunc()
    name.value = name.selectionEnd.slice(0, -1)
  } else if (temp === "20") {
    capsFunc()
    name.value = name.selectionEnd.slice(0, -1)
  } else if (temp === "37") {
    name.focus();
    name.selectionStart = currentPos.start - 1;
    name.selectionEnd = currentPos.end - 1;
  } else if (temp === "39") {
    name.selectionStart = currentPos.start + 1;
    name.selectionEnd = currentPos.end + 1;
  } else {
    if (LangSwitcher) {
      if (Voicer === true) { if (e.keyCode.toString() === "13") { keyAudioLang.play() } else { keyAudioEn.play(); } } if (e.keyCode.toString() === "13") { keyAudioLang.play() } else { keyAudioEn.play(); }
      if (Shift === true) {
        for (let key in arrEnShift) {
          if (temp === key) {
            tempLetter = arrEnShift[key];
            CurrentLetter = tempLetter;
          }
        }
      } else if (Shift === false) {
        for (let key in arrEn) {
          if (temp === key) {
            tempLetter = arrEn[key];
            CurrentLetter = tempLetter;
          }
        }
      }
    } else if (!LangSwitcher) {
      if (Voicer === true) { if (e.keyCode.toString() === "13") { keyAudioLang.play() } else { keyAudioRu.play(); } }
      if (Shift) {
        for (let key in arrRuShift) {
          if (temp === key) {
            tempLetter = arrRuShift[key];
            CurrentLetter = tempLetter;
          }
        }
      } else if (!Shift) {
        for (let key in arrRu) {
          if (temp === key) {
            tempLetter = arrRu[key];
            CurrentLetter = tempLetter;
          }
        }
      }
    }
  }
  console.log(typeof temp)
  KeyVirt(temp)
  currentKey()
}
//Выведение буквы с реальной клавиатуры на экран
function currentKey() {
  if (Shift && Caps) {
    let tempLetter = CurrentLetter;
    name.maxLength = CurrentLetter;
    name.minLength = 0;
    name.value += tempLetter.toLowerCase()
  } else if (Shift && !Caps) {
    let tempLetter = CurrentLetter;
    name.maxLength = CurrentLetter;
    name.minLength = 0;
    name.value += tempLetter.toUpperCase()
  } else if (!Shift && Caps) {
    let tempLetter = CurrentLetter;
    name.maxLength = CurrentLetter;
    name.minLength = 0;
    name.value += tempLetter.toUpperCase()
  } else if (!Shift && !Caps) {
    let tempLetter = CurrentLetter;
    name.maxLength = CurrentLetter;
    name.minLength = 0;
    name.value += tempLetter;
  }
}
// Подчеркивание клавиш виртуальной клавиатуры
function KeyVirt(val) {
  buttons.forEach(function (num) {
    if (num.attributes[0].value === val) {
      if (num.classList.contains('key-press')) {
        num.classList.remove('key-press');
      } else {
        buttons.forEach(buttons => buttons.classList.remove('key-press'));
        num.classList.add('key-press');
      }
    }
  })
}
// Функция снятия свойств с Виртуальных клавиш при клике  на другую кнопку
function clearProp() {
  buttons.forEach(buttons => buttons.classList.remove('key-press'))
}
// Переключение языка
function langSwitch() {
  name.focus()
  if (Voicer === true) { keyAudioLang.play() }
  if (!LangSwitcher) {
    LangSwitcher = true;
    toggleLetters()
    document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(1)").style.color = "black";
    document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(2)").style.color = "#FE8E25";
  } else if (LangSwitcher) {
    document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(1)").style.color = "#FE8E25";
    document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(2)").style.color = "black";
    LangSwitcher = false;
    toggleLetters()
  }
  return LangSwitcher
}
// CapsLock
function capsFunc() {
  name.focus()
  if (Voicer === true) { keyAudioCaps.play(); }
  if (!Caps) {
    Caps = true;
    toggleLetters()
    document.querySelector("body > main > div > div > div:nth-child(3) > button.caps").style.border = "3px solid #FE8E25";
  } else if (Caps) {
    Caps = false;
    toggleLetters()
    document.querySelector("body > main > div > div > div:nth-child(3) > button.caps").style.border = "1px solid #388663";
  }
  return Caps
}
//Shift
function shiftFunc() {
  toggleLetters()
  name.focus()
  if (Voicer === true) { keyAudioShift.play(); }
  if (!Shift) {
    document.querySelector("body > main > div > div > div:nth-child(4) > button.shift__btn").style.border = "3px solid #FE8E25";
    Shift = true;
    toggleLetters()
  } else if (Shift) {
    document.querySelector("body > main > div > div > div:nth-child(4) > button.shift__btn").style.border = "1px solid #388663";
    Shift = false;
    toggleLetters()
  }
}
// BackSpasce
function backSp() {
  name.focus()
  if (Voicer === true) { keyAudioBackSpace.play(); }
  if (name.textLength === name.selectionEnd) {
    name.value = name.value.slice(0, name.selectionEnd - 1)
  } else {
    name.value = name.value.slice(0, name.selectionEnd - 1) + name.value.slice(name.selectionEnd);
  }



}

// Кнопка влево
function leftFunc() {
  name.focus();
  if (Voicer === true) { keyAudioLang.play(); }
  name.selectionStart = name.selectionStart - 1;
  name.selectionEnd = name.selectionStart;
  a = name.selectionEnd
}
//Кнопка вправо
function rightFunc() {
  name.focus();
  if (Voicer === true) { keyAudioLang.play(); }
  name.selectionStart = name.selectionStart + 1;
  name.selectionEnd = name.selectionStart;
}
// кнопка появления и скрытия клавиатуры
function appearFunc() {
  if (Voicer === true) { keyAudioLang.play(); }
  if (appear === true) {
    appear = false;
    document.querySelector("body > main > div.btns > button.appear__btn").style.background = "#FCD35F";
    document.querySelector("body > main > div.keyboard").style.visibility = "visible";
  } else if (appear === false) {
    appear = true;
    document.querySelector("body > main > div.btns > button.appear__btn").style.background = "#E07B7E";
    document.querySelector("body > main > div.keyboard").style.visibility = "hidden";
  }
}
// Кнопка записи
function voiceFunc() {
  if (Voicer === true) {
    document.querySelector("body > main > div.btns > button.voice").style.background = "#E07B7E";
    Voicer = false;
  } else if (Voicer === false) {
    keyAudioLang.play()
    document.querySelector("body > main > div.btns > button.voice").style.background = "#FCD35F";
    Voicer = true;
  }
}
let recognizer = new webkitSpeechRecognition();
recognizer.interimResults = false;
recognizer.lang = 'ru-Ru';
recognizer.onresult = function (event) {
  let result = event.results[event.resultIndex];
  name.value += result[0].transcript;
  return;
};
let buttonSpeech = document.querySelector('.button-speech');
buttonSpeech.addEventListener('mousedown', recordFunc);
function recordFunc() {
  if (!LangSwitcher) {
    recognizer.lang = 'ru-Ru';
    recognizer.start();
  } else if (LangSwitcher) {
    recognizer.lang = 'en-En';
    recognizer.start();
  }
}
leftArrow.addEventListener('click', leftFunc);
rightArrow.addEventListener('click', rightFunc);
voice.addEventListener('click', voiceFunc);
appearBtn.addEventListener('click', appearFunc);
BackSpace.addEventListener('click', backSp);
name.addEventListener('keydown', keypr);
shift__btn.addEventListener('click', shiftFunc);
langBtn.addEventListener('click', langSwitch);
caps.addEventListener('click', capsFunc);


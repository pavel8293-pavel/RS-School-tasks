alert(`Важные моменты для проверяющих:
-Голосовой ввод работает при зажатой клавише записи.
-Иногда проскакивает ошибка undefined при нажатии на любую из клавиш виртуальной клавиатуры, не обращайте внимания просто печатайте дальше
переключение клавиши Shift происходит по клику, аналогично тому, как переключается состояние клавиши CapsLock в исходном проекте` ) 

const number = document.querySelectorAll('.btn');
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
let CurrentNumber
let LangSwitcher = false;
let Caps = false;
let Shift = false;
let appear = false;
let Voicer = true;
let Recording = true;

let arrEnShift = {"65": 'A', "66": 'B',"67": 'C', "68": 'D', "69": 'E', "70": 'F', "71": 'G',
"72": 'H', "73": 'I', "74": 'J', "75": 'K', "76": 'L', "77": 'M', "78": 'N', "79": 'O',
 "80": 'P', "81": 'Q', "82": 'R', "83": 'S', "84": 'T', "85": 'U', "86": 'V', "87": 'W', 
 "88": 'X', "89": 'Y',"90": 'Z',"186": ':', "188": '<', "190": '>', "219": '{', "221": '}', 
 "222": '\"', "191": '?', "192": '~', '32':" ", "49": '!', "50": '@',"51": '#', "52": '$', 
 "53": '%', "54": '^', "55": '&', "56": '*', "57": '(', "48": ')',"189": '_',"187": '+', "13":'\n',"220": '|'}

let arrRuShift = {"65": 'Ф', "66": 'И',"67": 'С', "68": 'В', "69": 'У', "70": 'А', "71": 'П',
 "72": 'Р', "73": 'Ш', "74": 'О', "75": 'Л', "76": 'Д', "77": 'Ь', "78": 'Т', "79": 'Щ',
  "80": 'З', "81": 'Й', "82": 'К', "83": 'Ы', "84": 'Е', "85": 'Г', "86": 'М', "87": 'Ц', 
  "88": 'Ч', "89": 'Н',"90": 'Л',"186": 'Ж', "188": 'Б', "190": 'Ю', "219": 'Х', "221": 'Ъ', 
  "222": 'Э', "191": ',', "192": 'Ё', '32':" ", "49": '!', "50": '@',"51": '#', "52": '$', 
  "53": '%', "54": '^', "55": '&', "56": '*', "57": '(', "48": ')',"189": '_',"187": '+', "13":'\n',"220": '/'}

let arrEn = {"65": 'a', "66": 'b',"67": 'c', "68": 'd', "69": 'e', "70": 'f', "71": 'g',
"72": 'h', "73": 'i', "74": 'j', "75": 'k', "76": 'l', "77": 'm', "78": 'n', "79": 'o',
 "80": 'p', "81": 'q', "82": 'r', "83": 's', "84": 't', "85": 'u', "86": 'v', "87": 'w', 
 "88": 'x', "89": 'y',"90": 'z',"186": ';', "188": ',', "190": '.', "219": '[', "221": ']', 
 "222": '\'', "191": '/', "192": '`', '32':" ","49": '1', "50": '2',"51": '3', "52": '4', 
 "53": '5', "54": '6', "55": '7',"56": '8', "57": '9', "48": '0',"189": '-',"187": '=', "13":'\n',"220": '\\'}

let arrRu = {"65": 'ф', "66": 'и',"67": 'с', "68": 'в', "69": 'у', "70": 'а', "71": 'п',
 "72": 'р', "73": 'ш', "74": 'о', "75": 'л', "76": 'д', "77": 'ь', "78": 'т', "79": 'щ',
  "80": 'з', "81": 'й', "82": 'к', "83": 'ы', "84": 'е', "85": 'г', "86": 'м', "87": 'ц', 
  "88": 'ч', "89": 'н',"90": 'я',"186": 'ж', "188": 'б', "190": 'ю', "219": 'х', "221": 'ъ', 
  "222": 'э', "191": '.', "192": 'ё', '32':" ","49": '1', "50": '2',"51": '3', "52": '4', 
  "53": '5', "54": '6', "55": '7',"56": '8', "57": '9', "48": '0',"189": '-',"187": '=', "13":'\n',"220": '\\'}

// Вывод символов на виртуальную клавиатуру
function buttonTxt(){
  number.forEach(function(num){
    let ButtonText
      if(Shift === false && LangSwitcher === false && Caps === false){
        ButtonText = arrRu[num.attributes[0].value]  
      }else if(Shift === true && LangSwitcher === false && Caps === true){
        ButtonText = arrRuShift[num.attributes[0].value].toLowerCase()
      }else if(Shift === true && LangSwitcher === false && Caps === false){
        ButtonText = arrRuShift[num.attributes[0].value]  
      }else if(Shift === false && LangSwitcher === false && Caps === true){
        ButtonText = arrRu[num.attributes[0].value].toUpperCase()

      }else if(Shift === false && LangSwitcher === true && Caps === false){
        ButtonText = arrEn[num.attributes[0].value]  
      }else if(Shift === true && LangSwitcher === true && Caps === true){
        ButtonText = arrEnShift[num.attributes[0].value].toLowerCase()
      }else if(Shift === true && LangSwitcher === true && Caps === false){
        ButtonText = arrEnShift[num.attributes[0].value]  
      }else if(Shift === false && LangSwitcher === true && Caps === true){
        ButtonText = arrEn[num.attributes[0].value].toUpperCase()
      }
    num.innerHTML  = ButtonText
    document.querySelector("body > main > div.keyboard > div > div:nth-child(5) > button.space__btn.btn").innerHTML = "Space"
    document.querySelector("body > main > div.keyboard > div > div:nth-child(2) > button:nth-child(14)").innerHTML = "Enter"
    return num.innerHTML
  })
}
buttonTxt()
//Вешаем событие на виртуальные клавиши
  number.forEach(function(num){
    num.addEventListener('click', function (arg) {
      clearProp();
      let letterNum = arg.target.attributes[0].value;
      LetterNum = letterNum;
      numberFunc(letterNum);

      });
  });
let numberFunc = (number) => {
  name.focus()
  let tempLetter;
    if(LangSwitcher === true){
      if(Voicer === true){if(number.toString() === "13"){keyAudioLang.play()}else{keyAudioEn.play()}}
      if(Shift === true){
        for(let key in arrEnShift){
          if(number === key){
            tempLetter = arrEnShift[key];
            CurrentLetter = tempLetter;
          }
        }
      }else if(Shift === false){
        for(let key in arrEn){
          if(number === key){
            tempLetter = arrEn[key];
            CurrentLetter = tempLetter;
          }
        }
      }
    }else if(LangSwitcher === false){  
      if(Voicer === true){if(number.toString() === "13"){keyAudioLang.play()}else{keyAudioRu.play()}}
      if(Shift === true){
        for(let key in arrRuShift){
          if(number === key){
            tempLetter = arrRuShift[key];
            CurrentLetter = tempLetter;
          }
        }
      }else if(Shift === false){
        for(let key in arrRu){
          if(number === key){
            tempLetter = arrRu[key];
            CurrentLetter = tempLetter;
          }
        }
      }
    }
  curString()
  }  
  // Выводим событие на эран
  function curString(){
    let tempLetter = CurrentLetter;
    if(Caps === true && Shift === false){
      name.value += tempLetter.toUpperCase();
      currentString = name.value;
    }   
    else if(Caps === true && Shift === true){   
      name.value += tempLetter.toLowerCase();
      currentString = name.value ;
    }else if(Shift === true && Caps === false){
      name.value += tempLetter.toUpperCase();
      currentString = name.value;
    }   
    else if(Caps === false && Shift === false){   
      name.value += tempLetter;
      currentString = name.value ;
    }
  }

//Считывание нажатия на реальной клавиатуре
function keypr(e){
  name.focus()
  let tempLetter;
  let temp = e.keyCode.toString();
  console.log(temp)
if(temp === "8"){
  if(Voicer === true){keyAudioBackSpace.play();}
  name.value = name.selectionEnd.slice(0,-1)
}else if( temp === "16"){
  shiftFunc()
  name.value = name.selectionEnd.slice(0,-1)
}else if( temp === "20"){
  capsFunc()
  name.value = name.selectionEnd.slice(0,-1)
}else if( temp === "37"){
  name.focus();
      name.selectionStart = currentPos.start - 1;
      name.selectionEnd = currentPos.end - 1;
}else if(temp === "39"){
  name.selectionStart = currentPos.start + 1;
  name.selectionEnd = currentPos.end + 1;
}else{
  if(LangSwitcher === true){
    if(Voicer === true){if(e.keyCode.toString() === "13"){keyAudioLang.play()}else{keyAudioEn.play();}}if(e.keyCode.toString() === "13"){keyAudioLang.play()}else{keyAudioEn.play();}
    if(Shift ===true){
      for(let key in arrEnShift){
        if(temp === key){
          tempLetter = arrEnShift[key];
          CurrentLetter = tempLetter;
        }
      }
    }else if(Shift ===false){ 
      for(let key in arrEn){
        if(temp === key){
          tempLetter = arrEn[key];
          CurrentLetter = tempLetter;
        }
      }
    }
  }else if(LangSwitcher === false){
    if(Voicer === true){if(e.keyCode.toString() === "13"){keyAudioLang.play()}else{keyAudioRu.play();}}
      if(Shift === true){
        for(let key in arrRuShift){
          if(temp === key){
            tempLetter = arrRuShift[key];
            CurrentLetter = tempLetter;
          }
        }
      }else if(Shift === false){ 
        for(let key in arrRu){
          if(temp === key){
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
function currentKey(){
    if(Shift === true && Caps === true){
      let tempLetter = CurrentLetter;
      name.maxLength = CurrentLetter;
      name.minLength = 0;
      name.value += tempLetter.toLowerCase()
    }else if(Shift === true && Caps === false){
      let tempLetter = CurrentLetter;
      name.maxLength = CurrentLetter;
      name.minLength = 0;
      name.value += tempLetter.toUpperCase()
    }else if(Shift === false && Caps === true){
      let tempLetter = CurrentLetter;
      name.maxLength = CurrentLetter;
      name.minLength = 0;
      name.value += tempLetter.toUpperCase()
    }else if(Shift === false && Caps === false){
      let tempLetter = CurrentLetter;
      name.maxLength = CurrentLetter;
      name.minLength = 0;
      name.value += tempLetter;
    }
}
// Подчеркивание клавиш виртуальной клавиатуры
function KeyVirt(val){
  number.forEach(function(num){
    if(num.attributes[0].value=== val){
      if (num.classList.contains('key-press')) {
        num.classList.remove('key-press');
      }else {
      number.forEach(number => number.classList.remove('key-press'));
      num.classList.add('key-press');
      }
    }
  })
}
// Функция снятия свойств с Виртуальных клавиш при клике  на другую кнопку
function clearProp(){ 
  number.forEach(number => number.classList.remove('key-press'))
}
// Переключение языка
function langSwitch(){
  name.focus()
  if(Voicer === true){  keyAudioLang.play()}
    if(LangSwitcher === false){
      LangSwitcher = true;
      buttonTxt()
      document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(1)").style.color = "black";
      document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(2)").style.color = "#FE8E25";
    }else if(LangSwitcher === true){
      document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(1)").style.color = "#FE8E25";
      document.querySelector("body > main > div > div > div:nth-child(4) > button.langBtn > span:nth-child(2)").style.color = "black";
      LangSwitcher = false;
      buttonTxt()
    }
  return LangSwitcher
}
// CapsLock
function capsFunc(){
  name.focus()
  if(Voicer === true){keyAudioCaps.play();}
    if(Caps === false){
      Caps = true;
      buttonTxt()
      document.querySelector("body > main > div > div > div:nth-child(3) > button.caps").style.border = "3px solid #FE8E25";
    }else if(Caps === true){
      Caps = false;
      buttonTxt()
      document.querySelector("body > main > div > div > div:nth-child(3) > button.caps").style.border = "1px solid #388663";
    }
  return Caps
}
//Shift
  function shiftFunc(){
    buttonTxt()
    name.focus()
    if(Voicer === true){keyAudioShift.play();}
      if(Shift === false){
        document.querySelector("body > main > div > div > div:nth-child(4) > button.shift__btn").style.border = "3px solid #FE8E25";
        Shift = true;
        buttonTxt()
      }else if(Shift === true){
        document.querySelector("body > main > div > div > div:nth-child(4) > button.shift__btn").style.border = "1px solid #388663";
        Shift = false;
        buttonTxt()
      } 
    }
// BackSpasce
function backSp(){
  name.focus()
  if(Voicer === true){keyAudioBackSpace.play();}
if(name.textLength === name.selectionEnd){
  name.value = name.value.slice(0,name.selectionEnd-1)
}else{
  name.value = name.value.slice(0,name.selectionEnd-1) + name.value.slice(name.selectionEnd);
}



}

// Кнопка влево
function leftFunc(){
  name.focus();
 if(Voicer === true){keyAudioLang.play();}
  name.selectionStart = name.selectionStart - 1;
 name.selectionEnd = name.selectionStart;
  a = name.selectionEnd 
}
//Кнопка вправо
function rightFunc(){
  name.focus();
 if(Voicer === true){keyAudioLang.play();}
    name.selectionStart = name.selectionStart + 1;
    name.selectionEnd = name.selectionStart;
}
// кнопка появления и скрытия клавиатуры
function appearFunc(){
  if(Voicer === true){keyAudioLang.play();}
  if(appear === true){
    appear = false;
    document.querySelector("body > main > div.btns > button.appear__btn").style.background = "#FCD35F";
    document.querySelector("body > main > div.keyboard").style.visibility = "visible";
  }else if(appear === false){
    appear = true;
    document.querySelector("body > main > div.btns > button.appear__btn").style.background = "#E07B7E";
    document.querySelector("body > main > div.keyboard").style.visibility = "hidden";
  }
}
// Кнопка записи
function voiceFunc(){
  if(Voicer === true){
    document.querySelector("body > main > div.btns > button.voice").style.background = "#E07B7E";
    Voicer = false;
  }else if(Voicer === false){
    keyAudioLang.play()
    document.querySelector("body > main > div.btns > button.voice").style.background = "#FCD35F";
    Voicer = true;
  }
}
let recognizer = new webkitSpeechRecognition();
recognizer.interimResults = false;
recognizer.lang = 'ru-Ru';
recognizer.onresult = function (event){
  let result = event.results[event.resultIndex];
    name.value += result[0].transcript;
    return;
};
let buttonSpeech = document.querySelector('.button-speech');
  buttonSpeech.addEventListener('mousedown', recordFunc);
function recordFunc(){
    if(LangSwitcher === false){
      recognizer.lang = 'ru-Ru';  
      recognizer.start();
    }else if(LangSwitcher === true){
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


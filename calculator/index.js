const number = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-operation]');
const clearButton = document.getElementById('c');
const decimalButton = document.getElementById('decimal');
const display = document.getElementById('display');
const minButton = document.getElementById('x');
const sqrtButton = document.getElementById('sqrt');
let MemoryCurrentNumber = 0;
let IsNumberSaved = false;
let MemoryPendingOperation = '';

//Функция ввода числа
number.forEach((pressedNumber) => {
    pressedNumber.addEventListener('click', (argument) => {
        enterNumber(argument.target.textContent);
    });
});

let enterNumber = (number) => {
    IsNumberSaved ?
        (display.value = number,
            IsNumberSaved = false) :
        display.value === "0" ? display.value = number :
            display.value += number;
}


let addMinusToNumber = () => { display.value *= -1 }
minButton.addEventListener('click', addMinusToNumber);

// Функция матеметических операций

enterPendingValue = (currentOperation) => {
    let localOperationMemory = +display.value;
    (IsNumberSaved && MemoryPendingOperation !== '=') ?
        display.value = MemoryCurrentNumber :
        IsNumberSaved = true;
        
    // Данная конструкция умножения и деления на 10 преобразует нецелые числа (0.1; 0.2 и др) и приводит их в норм вид

    (MemoryPendingOperation === '+') ? (MemoryCurrentNumber = (MemoryCurrentNumber * 10 + localOperationMemory * 10) / 10) :
        (MemoryPendingOperation === '-') ? (MemoryCurrentNumber = (MemoryCurrentNumber * 10 - localOperationMemory * 10) / 10) :
            (MemoryPendingOperation === '*') ? (MemoryCurrentNumber = (MemoryCurrentNumber * 10 * localOperationMemory * 10) / 100) :
                (MemoryPendingOperation === '/') ? (MemoryCurrentNumber = (MemoryCurrentNumber * 10 / localOperationMemory * 10) / 100) :
                    (MemoryPendingOperation === '^') ? (MemoryCurrentNumber = MemoryCurrentNumber ** localOperationMemory) :
                        (MemoryCurrentNumber = +localOperationMemory)
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = currentOperation;
}
operation.forEach((oper) => {
    oper.addEventListener('click', function (e) {
        enterPendingValue(e.target.textContent);
    });
});


// Очистка дисплея
let clearScreen = () => {
    display.value = '0';
    IsNumberSaved = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = ''
}

clearButton.addEventListener('click', clearScreen);

// Введение функции десятичной дроби
let enterDecimal = () => {
    let localDecimalMemory = display.value;
    (IsNumberSaved) ? (localDecimalMemory = '0.', IsNumberSaved = false) : (localDecimalMemory.indexOf('.') === -1) ? localDecimalMemory += '.' : false
    display.value = localDecimalMemory;
}
decimalButton.addEventListener('click', enterDecimal);

// Введение функции квадратного корня
let enterSqrt = () => {
    display.value > 0 ? display.value = Number(Math.sqrt(display.value)) : display.value = "Ошибка, число < 0";
}
sqrtButton.addEventListener('click', enterSqrt)
const greeting = document.querySelector('.greeting');
const iamgeButton = document.querySelector('.button__image');
const images = ['', '01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let arrayNight = [];
let arrayDay = [];
let arrayEvening = [];
let arrMorning = [];
let today = new Date()
let imageNumber = today.getHours() + 1;

// check if background is being changed every 00h 00min
function transsformBackground() {
    let seconds = today.getSeconds(),
        minutes = today.getMinutes();
    if (seconds === 0 && minutes === 0) {
        setGreeting()
    } else { false }
    setTimeout(transsformBackground, 1000)
}

function setGreeting() {
    let hours = today.getHours();
    document.body.style.color = '#EEE8AA'
    document.body.style.backgroundImage = `url(${commonArray[hours]})`;
    if (hours <= 5 && hours === 0) {
        greeting.textContent = 'Good night, '
    }
    if (hours <= 11 && hours > 5) {
        greeting.textContent = 'Good morning, '
    }
    if (hours <= 17 && hours > 11) {
        greeting.textContent = 'Good afternoon, '
    }
    if (hours > 18) {
        greeting.textContent = 'Good evening, '
    }
}

//random array with images
for (let j = 0; j < 6; j++) {
    arrayNight.push(`assets/images/night/${images[Math.floor(Math.random() * (20 - 1)) + 1]}`)
    arrMorning.push(`assets/images/morning/${images[Math.floor(Math.random() * (20 - 1)) + 1]}`)
    arrayDay.push(`assets/images/day/${images[Math.floor(Math.random() * (20 - 1)) + 1]}`)
    arrayEvening.push(`assets/images/evening/${images[Math.floor(Math.random() * (20 - 1)) + 1]}`)
}
const commonArray = [...arrayNight, ...arrMorning, ...arrayDay, ...arrayEvening]

function toggleBackground(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage() {
    const index = imageNumber % commonArray.length;
    const imageSrc = commonArray[index];
    toggleBackground(imageSrc);
    imageNumber++;
    iamgeButton.disabled = true;
    setTimeout(function () { iamgeButton.disabled = false }, 1000);
}

iamgeButton.addEventListener('click', getImage);
transsformBackground()
setGreeting()



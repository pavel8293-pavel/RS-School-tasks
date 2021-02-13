const UserName = document.querySelector('.user__name');
const dailyTarget = document.querySelector('.focus');

// Save default city
function getCurrentCity() {
    localStorage.getItem('city') === null || !localStorage.getItem('city') ?
        (localStorage.setItem('city', 'Minsk'),
            city.textContent = 'Minsk') :
        city.textContent = localStorage.getItem('city')
}

// Get name value from localStorage
function getUserName() {
    if (localStorage.getItem('name') === null || !localStorage.getItem('name')) {
        UserName.textContent = '[Enter your name]';
    } else {
        UserName.textContent = localStorage.getItem('name')
    }
}

// Save name value into Localstorage 
function setUserName(e) {
    if (e.type === "keypress") {
        if (e.keyCode == 13 && e.target.innerText) {
            localStorage.setItem('name', e.target.innerText);
            UserName.blur()
        }
        if (e.keyCode == 13 && !e.target.innerText && localStorage.getItem('name') === null) {
            getUserName()
            UserName.blur()
        }
        if (e.keyCode == 13 && !e.target.innerText && localStorage.getItem('name')) {
            UserName.textContent = localStorage.getItem('name')
            UserName.blur()
        }
    } else {
        if (e.target.innerText) {
            localStorage.setItem('name', e.target.innerText);
        }
        if (!e.target.innerText && localStorage.getItem('name') === null) {
            getUserName()
        }
        if (!e.target.innerText && localStorage.getItem('name')) {
            UserName.textContent = localStorage.getItem('name')
        }
    }
}

// Get daily target value from localStorage
function getDailyTarget() {
    if (localStorage.getItem('daily target') === null || !localStorage.getItem('daily target')) {
        dailyTarget.textContent = '[Enter your name]';
    } else {
        dailyTarget.textContent = localStorage.getItem('daily target')
    }
}

// Set daily target value to localStorage
function setDailyTarget(e) {
    if (e.type === "keypress") {
        if (e.keyCode == 13 && e.target.innerText) {
            localStorage.setItem('daily target', e.target.innerText);
            dailyTarget.blur()
        }
        if (e.keyCode == 13 && !e.target.innerText && localStorage.getItem('daily target') === null) {
            getDailyTarget()
            dailyTarget.blur()
        }
        if (e.keyCode == 13 && !e.target.innerText && localStorage.getItem('daily target')) {
            dailyTarget.textContent = localStorage.getItem('daily target')
            dailyTarget.blur()
        }
    } else {
        if (e.target.innerText) {
            localStorage.setItem('daily target', e.target.innerText);
        }
        if (!e.target.innerText && localStorage.getItem('daily target') === null) {
            getDailyTarget()
        }
        if (!e.target.innerText && localStorage.getItem('daily target')) {
            dailyTarget.textContent = localStorage.getItem('daily target')
        }
    }
}

// Clean the daily target string
cleanDailyTarget = () => dailyTarget.textContent = '';

// Clean the name string
cleanUserName = () => UserName.textContent = '';

getCurrentCity();
getUserName()
getDailyTarget()
UserName.addEventListener('click', cleanUserName)
UserName.addEventListener('keypress', setUserName)
UserName.addEventListener('blur', setUserName)
dailyTarget.addEventListener('click', cleanDailyTarget)
dailyTarget.addEventListener('keypress', setDailyTarget)
dailyTarget.addEventListener('blur', setDailyTarget)


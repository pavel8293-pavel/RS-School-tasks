
//BURGER-MENU
const darked = document.querySelector('.darked');
const burger__img = document.querySelector('.burger__img');
darked.addEventListener('click', darkedOn);
burger__img.addEventListener('click', burgerOn);
let BurgerVisiblity = false;

function burgerOn(){
    if(BurgerVisiblity === false){
        let tempVisibility = true;
        document.querySelector("body > header > div > div > nav > div > label > img").style.transform = 'rotate(-90deg)';
        document.querySelector("body > header > div > div > nav > div > label > img").style.transition = '0.3s';
        document.querySelector("body > header > div > div > nav > div > div").style.right = "0%";
        document.querySelector("body > header > div > div > nav > div > ul").style.right ="0%";
        document.body.style.overflow ="hidden";
        document.querySelector("body > header > div > div > nav > div > ul").style.width ="320px";
        document.querySelector("body > header > div > div > div").style.visibility="hidden";
        BurgerVisiblity = tempVisibility;
    }else if(BurgerVisiblity === true){
        let tempVisibility = false;
        darkedOn();
        BurgerVisiblity = tempVisibility;
    }else{
        false;
    }

}
function darkedOn(){
    let tempVisibility = false;
    document.querySelector("body > header > div > div > nav > div > div").style.right ="-100%";
    document.querySelector("body > header > div > div > nav > div > ul").style.right ="-100%";
    document.querySelector("body > header > div > div > nav > div > ul").style.width ="100%";
    document.body.style.overflow ="visible";
    document.querySelector("body > header > div > div > div").style.visibility="visible";
    document.querySelector("body > header > div > div > div").style.transform='translate(0px)'; 
    document.querySelector("body > header > div > div > nav > div > label > img").style.transform = 'rotate(0deg)';
    document.querySelector("body > header > div > div > nav > div > label > img").style.transition = '0.3s';
    BurgerVisiblity = tempVisibility;
}








let  a =''
let pets = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', 'pets.json');
request.onload = () => {request.response
console.log(request.response)};
fetch('pets.json').then(res => res.json()).then(list => {
  pets = list;

  fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i++) {
      const newPets = pets;

      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }

      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  createPets(fullPetsList);

  document.querySelector("#currentPage").innerText = (currentPage+1).toString();

  for (let i = 0; i < (fullPetsList.length / 6); i++) {
    const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      stepList.forEach((item, ind) => {
        if ( item.name === stepList[j].name && (ind !== j) ) {
          document.querySelector("#pets").children[(i * 6) + j].style.border = '5px solid red';
        }
      })
    }
  }
})




// request.onload = () => {
//   pets = JSON.parse(request.response);


// }





const createPets = (petsList) => {
  const elem = document.querySelector("#pets");
  elem.innerHTML += createElements(petsList);
}

createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += `<div class="slide">
            <img src=" ${ petsList[i].img }">
            <p class="name">${ petsList[i].name}</p>
            <button class="learn_more">Learn more</button>
            </div>`;
  }

  return str;
}




const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}

let currentPage = 0;
document.querySelector("#left__arrow").addEventListener('click', (e) => {
  if (currentPage > 0) {
    currentPage--;
    console.log(currentPage+1);
    if(currentPage === 3){ currentPage = 14}
  }
  document.querySelector("#pets").style.top = `calc(525px - ${525 * currentPage}px)`;
  document.querySelector("#currentPage").innerText = (currentPage+1).toString();

});

document.querySelector("#right__arrow").addEventListener('click', (e) => {
  if (currentPage < (document.querySelector("#pets").offsetHeight / 525) - 1) {
currentPage++;
    if(currentPage === 13){ currentPage = 2}
    console.log(currentPage+1);
  }

  document.querySelector("#pets").style.top = `calc(525px - ${525 * currentPage}px)`;
  document.querySelector("#currentPage").innerText = (currentPage+2).toString();
});


request.send();

 ///let itemsPerPage = 8;
 //(fullPetsList / itemsPerPage)
 //const checkItemsPerPage = () => {
   //if (document.querySelector("body").offsetWidth > 768 && document.querySelector("body").offsetWidth < 1280) {
   //itemsPerPage = 6;

 //}
 //}






 /**let pet = []; // 8
const request1 = new XMLHttpRequest();
request1.open('GET', './pets.json');
request1.onload = () => {
pet = JSON.parse(request1.response);
console.log(pet)
}*/
  





/*const createPet = (pet) => {
  const elem = document.querySelector("#pets");
  elem.innerHTML += createElement(petList);
}

createElement = (pet) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += `<div class="popup">
            <div class="image">
            <img src=" ${ petsList[i].img }">
            </div>
            <div class="name">${ petsList[i].name }</div>
            <div class="breed">${ petsList[i].type} - ${ petsList[i].breed}</div>
            <div class="description">${ petsList[i].description}</div>
            <div class="info">
              <ul class="info__inner">
              <li>${ petsList[i].age}</li>
              <li>${ petsList[i].inoculations}</li>
              <li>${ petsList[i].diseases}</li>  
              <li>${ petsList[i].parasites}</li>
              </ul>
            </div>
            </div>`;
  }
  return str;
}


///////////////////////////////////////////////////////////////////
*/



/*request1.send()
const slide = document.querySelector("#pets > div:nth-child(1)")
//const learnMore = document.querySelector('.pets');
slide.addEventListener('click', popup);
//learnMore.addEventListener('click', popup);

function popup(){
  let a = 'jghbkkj'
  console.log(a)


}


popup()*/
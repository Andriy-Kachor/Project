// 7-1.
// За допомогою методів об’єкта window створити:
// 1) нове вікно розміром 300х300 пікселів.
// 2) із затримкою 2 сек змініть розміри вікна на 500х500 пікселів
// 3) із затримкою 2 сек перемістіть вікно в точку з координатами (200, 200)
// 4) із затримкою 2 сек закрийте вікно.
// let newWindow = window.open("", "", "width=300,height=300");
// setTimeout (() => {window.resizeTo(500, 500)},2000);
// setTimeout (() => {window.moveTo(200, 200)},4000);
// setTimeout (() => {window.close()},6000);

// 7-2.
// Для заданої HTML-сторінки:
// <p id ='text'>I learning JavaScript events!</p>
// <div>
//         <button . . . . . >Change style!</button>
// </div>

// напишіть функцію changeCSS(), яка спрацьовуватиме по кліку на кнопку і змінюватиме стиль
//  вмісту тега <p>: колір шрифту – оранжевий, розмір шрифту 20px, шрифт сімейства "Comic Sans MS".
const button = document.getElementById("btn");
const text = document.getElementById("text");
button.addEventListener("click", () => {
  if (text.classList.contains("orageStyle")) {
    text.classList.remove("orageStyle");
  } else {
    text.classList.add("orageStyle");
  }
});

// 7-3.
// Задано сторінку з 3 кнопками і 1 лінкою. Напишіть Javascript код і реалізуйте HTML-сторінку
// з відповідними подіями на кожному елементові:
// 1) 1-ша кнопка – при кліку на неї колір фону сторінки міняється на синій
// 2) 2-га кнопка – при подвійному кліку на неї колір фону сторінки міняється на рожевий
// 3) 3-я кнопка – при натисненні і утримуванні кнопки колір фону сторінки стає коричневий.
// При відпусканні – білий.
// 4) При наведенні на лінку – колір фону стає жовтим, при відведенні – білим.
//  Приклад – курсор наведений на лінку.

const blueBtn = document.getElementById("blueBtn");
const pinkBtn = document.getElementById("pinkBtn");
const brownBtn = document.getElementById("brownBtn");
const yellowbtn = document.getElementById("yellowbtn");
const grennBtn = document.getElementById("grennBtn");
blueBtn.addEventListener("click", () => {
  if (document.body.classList.contains("BGCblue")) {
    document.body.classList.remove("BGCblue");
  } else {
    document.body.classList.add("BGCblue");
  }
});
pinkBtn.addEventListener("dblclick", () => {
  if (document.body.classList.contains("BGCpink")) {
    document.body.classList.remove("BGCpink");
  } else {
    document.body.classList.add("BGCpink");
  }
});

brownBtn.addEventListener("mousedown", () => {
  document.body.classList.add("BGCbrown");
});
brownBtn.addEventListener("mouseup", () => {
  document.body.classList.remove("BGCbrown");
});

yellowbtn.addEventListener("mouseover", () => {
  document.body.classList.add("BGCyellow");
});
yellowbtn.addEventListener("mouseout", () => {
  document.body.classList.remove("BGCyellow");
});

const clickAndHold = function (btnEl) {
  let timerId;
  const duration = 1000;

  const onMouseDown = function () {
    timerId = setInterval(() => {
      btnEl && btnEl.click();
      if (document.body.classList.contains("BGCgreen")) {
        document.body.classList.remove("BGCgreen");
      } else {
        document.body.classList.add("BGCgreen");
      }
    }, duration);
  };
  const clearTimer = () => {
    timerId && clearInterval(timerId);
  };
  btnEl.addEventListener("mousedown", onMouseDown);
  btnEl.addEventListener("mouseup", clearTimer);
  btnEl.addEventListener("mouseout", clearTimer);
  return () => {
    btnEl.removeEventListener("mousedown", onMouseDown);
    btnEl.removeEventListener("mouseup", clearTimer);
    btnEl.removeEventListener("mouseout", clearTimer);
  };
};
clickAndHold(grennBtn);

// 7-4.
// Реалізуйте програму, яка по натисканню на кнопку видалятиме
// обраний елемент випадаючого списку. Можуть видалятися всі елементи в будь-якому порядку.
const selectList = document.getElementById("selectList");
const selectListBtn = document.querySelector(".selectListBtn");
selectListBtn.addEventListener("click", () => {
  selectList.children[selectList.selectedIndex].outerHTML = "";
});

// 7-5.
// Реалізуйте програму, яка по натисканню на кнопку виводитиме повідомлення
// "I was pressed!", при наведенні на кнопку виводитиме повідомлення "Mouse on me!", \
// а при відведенні курсора миші виводитиме повідомлення "Mouse is not on me!".

const liveButton = document.querySelector(".liveButton");
const liveButtonConteiner = document.querySelector(".liveButtonConteiner");
liveButton.addEventListener("click", () => {
  let paragrClick = document.createElement("p");
  paragrClick.innerText = "I was pressed";
  liveButtonConteiner.appendChild(paragrClick);
});

liveButton.addEventListener("mouseover", () => {
  let paragrMouseover = document.createElement("p");
  paragrMouseover.innerText = "Mouse on me!";
  liveButtonConteiner.appendChild(paragrMouseover);
});

liveButton.addEventListener("mouseout", () => {
  let paragrMouseout = document.createElement("p");
  paragrMouseout.innerText = "Mouse is not on me!";
  liveButtonConteiner.appendChild(paragrMouseout);
});

// 7-6.
// Реалізуйте програму, яка відслідковуватиме зміну розміру (ширини і висоти) вікна браузера і
// виводитиме на поточну сторінку при її розтязі/стисканні відповідні значення.

const displaySize = document.querySelector(".displaySize");

window.addEventListener("load", () => {
  displayWindowSize();
});
window.addEventListener("resize", () => {
  displayWindowSize();
});

function displayWindowSize() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  const displaySizeParag = document.createElement("p");
  displaySizeParag.innerText = `Window height: ${height}px, width: ${width}px`;
  displaySize.appendChild(displaySizeParag);
}

// 7-7.
// На сторінці потрібно реалізувати 2 випадаючих списки. У першому містяться назви країн,
// у другому – назви міст. Реалізувати роботу таким чином, щоб коли вибирається з лівого
// випадаючого списку певна країна - в правому випадаючому  списку з'являлися міста цієї країни.
// Список міст формується динамічно, через JavaScript. Також потрібно нижче вивести назву обраної
// країни і місто.

const countryList = document.getElementById("country");
const citiesList = document.getElementById("cities");
const selectedCity = document.getElementById("selected");

const gerCities = [
  "Berlin",
  "Hamburg",
  "Munich",
  "Stuttgart",
  "Düsseldorf",
  "Dortmund",
];
const usaCities = [
  "New York",
  "Los Angeles",
  "San Francisco",
  "Chicago",
  "Houston",
  "Memphis",
];
const uaCities = [
  "Lviv",
  "Kyiv",
  "Kharkiv",
  "Simferopol",
  "Donetsk",
  "Mykolaiv",
  "Chernihiv",
];

window.addEventListener("load", () => {
  if (countryList.value === "Germany") {
    fillList(gerCities);
  }
  if (countryList.value === "USA") {
    fillList(usaCities);
  }
  if (countryList.value === "Ukraine") {
    fillList(uaCities);
  }
});

countryList.addEventListener("change", () => {
  citiesList.innerHTML = "";
  if (countryList.value === "Germany") {
    fillList(gerCities);
  }
  if (countryList.value === "USA") {
    fillList(usaCities);
  }
  if (countryList.value === "Ukraine") {
    fillList(uaCities);
  }
});

citiesList.addEventListener("change", () => {
  selectedCity.innerText = `Selected country: ${countryList.value}, selected city: ${citiesList.value}`;
});

function fillList(arr) {
  for (let i = 0; i < arr.length; i++) {
    const city = document.createElement("option");
    city.innerText = arr[i];
    citiesList.appendChild(city);
  }
}

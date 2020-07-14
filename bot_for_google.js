// ==UserScript==
// @name         botForGoogle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let keywords = ["Гобой","Как звучит флейта", "Тромбон", "Что такое валторна", "Фагот", "Скрипка", "Виолончель "]; //объявляем массив для последующего набора в строке поиска
let keyword = keywords[getRandom(0,keywords.length)]; //объявляем переменную путём случайного выбора из массива
let btnK = document.getElementsByName("btnK")[1]; //объявляем переменную элемент главной кнопки поиска
let links = document.links; //объявляем массив ссылок документа
function getRandom(min,max){ // задаём функцию случайного значения от минимума до максимума
    return Math.floor(Math.random()*(max-min)+min); //функция возвращает окрушленное к меньшему (Math.floor) значение от минимально положительного (не ноль) до максимально положительного
}

function writeKeyWord(word){ //задаём функцию побуквенной печати слов
    let i=0 //объявляем переменную 
    let timerID = setInterval(()=>{ // объявляем идентификатор таймера для регулярно повторяющегося отсчета
        document.getElementsByName("q")[0].value+=word[i]; //находим строку поиска и вносим значение переменной
        i++ // инкремент
        if (i==word.length){ //если переменная равна длинне слова ?? кстати я не понимаю от куда берется (word) значение
            clearInterval(timerID); //остановить выполнение функции регулярного отсчета
            btnK.click(); // нажать кнопку  поиска
        }
    },100) // объявляем значение setInterval в миллисекундах
}

if (btnK != undefined) //если значение кнопки поиска не является неопределённым
    writeKeyWord(keyword); //начинаем печатать побуквенно выбранное случайно слово
else if (location.hostname == "www.google.com"){ //если главный домен гугл
    let flag = true; //объявляем переменную флаг = верно
    for (let i=0; i<links.length; i++){ //тогда цикл фор: переменная i меньше количества ссылок в инкременте 
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){ // если попалась ссылка сайта музыкалка
            flag = false; //переменная флага меняет значение = неверно
            links[i].click(); //клик на ссылку
            break; //прерывание до окончания цикла
        }
    }
    if (document.getElementsByClassName("YyVfkd")[0].textContent > 9){ //если найденный по классу элемент документа первый из массива содержит текст больше цифры 9
    flag = false; // то переменная флаг принимает значение = неверно
    location.href = "https://www.google.com/"; //переходим на страницу хоста гугл
    }
    if (flag) setTimeout(()=>{pnnext.click()},getRandom(3000,6000)); // если флаг верен, то спустя интервал времени (от 3х до 6ти секунд) клик на объект документа следстр
}else{ //либо
    setInterval(()=>{ //спустя повторяющийся отрезок времени
        if (getRandom(0,101)>=70) location.href = "https://www.google.com/"; //с вероятностью 30% возврящаемся на гугл
        else{ //либо
            let index = getRandom(0,links.length) //случайность одна из ссылок на странице сайта на котором находимся
            if(links[index].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1) //проверяет наличие ссылки на музыкалку, не допуская другие ссылки (конструкциядвойного отрицания !=-1)
                links[index].click(); // тогда клик
        }
    },getRandom(2000,4000)); //выбранный случайно от 2х до 4х секунд
}

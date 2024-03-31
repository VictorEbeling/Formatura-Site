(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll(".counter");

    let giftValue;

    var qtd = Array.from({length: counters.length}).fill(0);
 
    const plusButtons = document.querySelectorAll(".plus-button");
    const minusButtons = document.querySelectorAll(".minus-button");

    for(let i = 0; i < counters.length; i++){
        plusButtons[i].addEventListener('click', ()=>{
            qtd[i]++;
            updateCounter(i);
        })

        minusButtons[i].addEventListener('click', ()=>{
            if(qtd[i] > 0){
                qtd[i]--;
                updateCounter(i);
            }
        })
        
    }
    
    function updateCounter(i){
        counters[i].innerHTML = qtd[i];
        console.log(qtd.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        },0));
    }

    function sendPrice(){
        const totalQtd = qtd.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        },0)

        window.location.href = `/checkout&price=${totalQtd}`
    }

    if (window.location.href.includes("checkout")){
        let params = new URL(window.location.href).searchParams.toString().split("&").reduce((previous, current)=> { const [key, value] = current.split("="); previous[key] = value; return previous },{})
        console.log(params)

    }
    

})





},{}]},{},[1]);

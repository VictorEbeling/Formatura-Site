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





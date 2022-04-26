const road = document.querySelectorAll('#grid > div');
const scoreEl = document.querySelector('#score');

/*for (let i = 0; i < road.length; i++) {
    road[i].innerText = i;
}*/

//conservo in variabile i riferimenti 
//all'elemento contenente la papera
const duckIdx = 1
const duck = road[duckIdx];
duck.classList.add('duck');

let speed = 200;
let score = 0;

//LOGICA AGGIUNTA PIANTA
function addPlant(){
    let currentPlantIdx = road.length -1;
    road[currentPlantIdx].classList.add('plant');
   
    //MOVIMENTO DELLA PIANTA
    const plantIntVal = setInterval(function(){
        score++;
        scoreEl.innerText = score;

        if(score % 50 === 0){
            speed = speed - 20;
        }   
        
        road[currentPlantIdx].classList.remove('plant');
        currentPlantIdx--;
    
        if(currentPlantIdx < 0){
            clearInterval(plantIntVal);
            addPlant();
            return;
        }

        if(
            currentPlantIdx === duckIdx &&
            !road[currentPlantIdx].classList.contains('duck-jump')
        ) {
            road[currentPlantIdx].classList.remove('duck');
            road[currentPlantIdx].classList.add('plant');
            showAlert('CRASH');
            clearInterval(plantIntVal);
            return;
        }
        
        road[currentPlantIdx].classList.add('plant');
    }, speed);
}

addPlant();


function jump(event){
    if(event.code === 'Space' && !event.repeat ){
        duck.classList.add('duck-jump');
        setTimeout(function(){
            duck.classList.remove('duck-jump');
        }, 300)
    }
}
document.addEventListener('keydown', jump);

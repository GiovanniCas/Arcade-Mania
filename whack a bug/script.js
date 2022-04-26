//Inseriamo il punteggio iniziale
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = score;

// Inseriamo il timer iniziale
const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;

//inseriamo il bug in una cella vis js
const cells = document.querySelectorAll('.cell');


// diamo un valore di velocita; iniziale
let bugSpeed = 800; // millisecondi

// logica per randomizzare il bug in una cella
function randomBug() {
    //pulisco tutte le celle prima di randomizzarne un'altra
    removeBug();

    // Aumentiamo la difficolta' se il giocatore e' troppo bravo!
    if(score === 15){
        bugSpeed = bugSpeed / 2;
    }

    // randomizzo una cella a caso
const randomNumber = Math.floor(Math.random() * cells.length);
const cell = cells[randomNumber];
cell.classList.add('bug');
}

const bugMovement = setInterval(randomBug, 800);

function removeBug(){
    for (let i = 0; i < cells.length; i++) {
        const cellTOClean = cells[i];
        cellTOClean.classList.remove('bug');
    }
}

// Diamo modo all'utente di colpire il bug!
for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', function(){
        //se tra le classi della cella cliccata c'e' la classe bug
        if (cell.classList.contains('bug')) {
            // incremento il punteggio e lo stampo
            score++;
            scoreDisplay.innerText = score;

            cell.classList.remove('bug');
            cell.classList.add('splat');

            setTimeout(function(){
                cell.classList.remove('splat');
            }, 200);
        }
    });
}

//impostiamo un conto alla rovescia
const timer = setInterval(countDown, 1000);


function countDown(){
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if(timeLeft === 0){
        clearInterval(timer);
        clearInterval(bugMovement);
        removeBug();

        showAlert(`GAME OVER! Punti: ${score}`);
    }
}


// Tasto rigioca
const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', function(){
    window.location.reload(); //ricarico la pagina
})
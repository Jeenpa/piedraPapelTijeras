const d = document;
let selection = null;
let timer;
let timeLeft;
let count = 0;
let countPlayer = 0;
let countComputer = 0;
let countEquals = 0;


// Activa las opciones del jugador al iniciar partida
function allowPlay(){
    d.querySelector("#piedra").disabled = false;
    d.querySelector("#papel").disabled = false;
    d.querySelector("#tijeras").disabled = false;
}

// Desactiva las opciones del jugador para que pueda hacerlo solo al iniciar partida
function denyplay(){
    d.querySelector("#piedra").disabled = true;
    d.querySelector("#papel").disabled = true;
    d.querySelector("#tijeras").disabled = true;
}

denyplay();


d.addEventListener("click", e => {
// Delegación de captura de eventos para escuchar opciones del jugador

    if(e.target.matches(".play")){
        allowPlay();
        timeLeft = 6;
        e.target.hidden = true;
        startTimer();
    }

    if(e.target.matches(".reset")){
        denyplay();
        reset();
    }

    if(e.target.matches(".buttons") || e.target.matches(".buttons *")){
        selection = e.target.parentElement.id;
        playGamer();
        check();
        timeLeft = 1;
    }

});

function getComputerChoice() {
    //Emulacion aleatoria de juego de la computadora
    let choise = ['piedra', 'papel', 'tijeras'];
    return choise[Math.floor(Math.random() * choise.length)];
}

function playRound(playerSelection, computerSelection) {
    //Determina resultados de cada ronda
    let player = playerSelection.toLowerCase();

    //Valida si lo que ingreso el usuario es opción correcta
    if((player === "piedra") || (player === "papel") || (player === "tijeras")){
        //Si jugador gana
        if ((playerSelection === "papel" && computerSelection === "piedra") || (playerSelection === "piedra" && computerSelection === "tijeras") || (playerSelection === "tijeras" && computerSelection === "papel")){
            return `El jugador gano! ${playerSelection} derrota ${computerSelection}`;  
        
        }  //Si computadora gana
        else if ((playerSelection === "piedra" && computerSelection === "papel") || (playerSelection === "tijeras" && computerSelection === "piedra") || (playerSelection === "papel" && computerSelection === "tijeras")){
            return `La computadora gano!  ${computerSelection} derrota ${playerSelection}`;  
        }  //Si hay empate
        else {
            return "Es un empate!";
        }
    } else {
        console.error("Ha ingresado una opcion invalida");
    }
}


function paintRoundWinner(user, computer) {
    // Pinta en la interfaz la opcion seleccionada de cada jugador
    d.querySelector("#cpu").src = `img/${computer}(1).png`;
    d.querySelector("#user").src = `img/${user}(1).png`;
}

function startTimer() {

    timer = setInterval(() => {
        timeLeft--;
        d.querySelector("#count").innerHTML = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            if(!selection){
                alert("¡Tiempo agotado! gana la computadora.");
                countComputer++;
                d.querySelector("#computer-score").innerHTML = countComputer;
                timeLeft = 6;
            }

            if(check()){
                startTimer();
                selection = null;
                timeLeft = 6;
            } else{
                reset();
            }
            
        }
    }, 1000);
}

function reset(){
    countPlayer = 0;
    countComputer = 0;

    clearInterval(timer);

    d.querySelector("#current").innerHTML = "Partida actual";
    d.querySelector("#current").style.fontSize = "20px";
    d.querySelector("#count"). innerHTML = 0;
    d.querySelector("#cpu").src = "img/desconocido.png";
    d.querySelector("#user").src = "img/desconocido.png";
    d.querySelector("#player-score").innerHTML = countPlayer;
    d.querySelector("#computer-score").innerHTML = countComputer;
    d.querySelector(".play").hidden = false;
}


function play() {
    let computerSelection = getComputerChoice();
      
    let result = playRound(selection, computerSelection);
    d.querySelector("#current").innerHTML = result;
    d.querySelector("#current").style.fontSize = "15px";
    paintRoundWinner(selection, computerSelection);

    return result;
}
  

function playGamer() {
        let result = play();

        if (result.includes("jugador")) {
            countPlayer++;
            d.querySelector("#player-score").innerHTML = countPlayer;
        } else if (result.includes("computadora")) {
            countComputer++;
            d.querySelector("#computer-score").innerHTML = countComputer;
        } else {
            countEquals++;
        }    
}

function check(){
    // Chequea si el jugador o la pc han alcanzado las 5 rondas ganadas y determina el ganador del juego
    if (countPlayer == 5){
        reset();
        denyplay();
        alert("¡Has ganado, eres incluso superior a una máquina! Reintenta y sigue demostrándolo.");
        d.querySelector(".play").hidden = false;
        return false;
    }         
    if (countComputer == 5){
        reset();
        denyplay();
        alert("Te ha ganado la computadora, al parecer es mejor que tú reinténtalo y demuestra lo contrario.");
        d.querySelector(".play").hidden = false;
        return false;
    } 

    return true;
}
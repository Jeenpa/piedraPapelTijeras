const d = document;
let selection = null;
let timer;
let timeLeft = 6;
let computerSelection;

function paintRoundWinner(user, computer) {
    d.querySelector("#cpu").src = `img/${computer}(1).png`;
    d.querySelector("#user").src = `img/${user}(1).png`;
}

function resetRoundWinner() {
    d.querySelector("#cpu").src = "img/desconocido.png";
    d.querySelector("#user").src = "img/desconocido.png";
}

function startTimer() {

    timer = setInterval(() => {
        resetRoundWinner();
        computerSelection = getComputerChoice();
        timeLeft--;
        d.querySelector("#count").innerHTML = timeLeft;
        d.querySelector("#current").innerHTML = "Partida actual";
        d.querySelector("#current").style.fontSize = "20px";

        if (timeLeft === 0) {
            if(!selection){
                clearInterval(timer);
                alert("¡Tiempo agotado! Selecciona piedra, papel o tijeras.");
                timeLeft = 6;
            } else{
                paintRoundWinner(selection, computerSelection);
                let result = playRound(selection, computerSelection);
                d.querySelector("#current").innerHTML = result;
                d.querySelector("#current").style.fontSize = "15px";
                selection = null;
                clearInterval(timer);
                timeLeft = 6;
            }
        }
    }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timeLeft = 6;
  d.querySelector("#count").innerHTML = 0;
}

// Inicia el juego
d.addEventListener("click", e => {

    if(e.target.matches(".play")){
        startTimer();
    }

    if(e.target.matches(".reset")){
        stopTimer();
    }

    if(e.target.matches(".buttons") || e.target.matches(".buttons *")){
        selection = e.target.parentElement.id;
    }

});

function getComputerChoice() {
    //Emulacion aleatoria de juego de la computadora
    let choise = ['piedra', 'papel', 'tijeras'];
    return choise[Math.floor(Math.random() * choise.length)];
}


function playRound(playerSelection, computerSelection) {
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
  

function playGame() {
    let countPlayer = 0;
    let countComputer = 0;
    let countEquals = 0;
    

    
    for (let i = 1; i <= 5; i++) {

        startTimer();
/*
         console.log(call);

        if (call.includes("jugador")) {
            countPlayer++;
        } else if (call.includes("computadora")) {
            countComputer++;
        } else {
            countEquals++;
        } */
    } 
    return countPlayer > countComputer ? `El jugador gana el juego!
    Resultados:
            Jugador: ${countPlayer} 
            Computadora: ${countComputer}
            Empates: ${countComputer}` : 
            `La computadora gana el juego!
    Resultados:
            Jugador: ${countPlayer} 
            Computadora: ${countComputer}
            Empates: ${countComputer}`;
}

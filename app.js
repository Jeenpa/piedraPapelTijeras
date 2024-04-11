const d = document;
let selection = null;
let timer;
let timeLeft;
let count = 0;
let countPlayer = 0;
let countComputer = 0;
let countEquals = 0;



function paintRoundWinner(user, computer) {
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
                check();
                if(check()){
                 startTimer();
                }
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
}

function play() {
    let computerSelection = getComputerChoice();
      
    let result = playRound(selection, computerSelection);
    d.querySelector("#current").innerHTML = result;
    d.querySelector("#current").style.fontSize = "15px";
    paintRoundWinner(selection, computerSelection);

    return result;
}



// Captura de eventos para escuchar opciones del jugador
d.addEventListener("click", e => {

    if(e.target.matches(".play")){
        timeLeft = 6;
        startTimer();
    }

    if(e.target.matches(".reset")){
        reset();
    }

    if(e.target.matches(".buttons") || e.target.matches(".buttons *")){
        selection = e.target.parentElement.id;
        count++;

        if (countPlayer == 5 || countComputer == 5) {
            alert("Límite alcanzado debe reiniciar la partida");
        } else{
            playGamer();
            check();
        }
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
    if (countPlayer == 5){
        alert("¡Has ganado, eres incluso superior a una máquina! Reintenta y sigue demostrándolo.");
        clearInterval(timer);
        return false
    }         
    if (countComputer == 5){
        alert("Te ha ganado la computadora, al parecer es mejor que tú reinténtalo y demuestra lo contrario.");
        clearInterval(timer);    
        return false;
    } 

    return true;
}
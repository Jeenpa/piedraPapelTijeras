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
        const playerSelection = prompt("Ingresa tu elección (piedra, papel o tijeras)");
        const computerSelection = getComputerChoice();
        const call = playRound(playerSelection, computerSelection);
        console.log(call);

        if (call.includes("jugador")) {
            countPlayer++;
        } else if (call.includes("computadora")) {
            countComputer++;
        } else {
            countEquals++;
        }
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

console.log(playGame());
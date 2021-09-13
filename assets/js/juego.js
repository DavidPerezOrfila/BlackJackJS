/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Rombos)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Picas)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntosHTML = document.querySelectorAll("small");

// Función que mezcla la baraja
const crearDeck = () => {
    // Cartas de la 2 hasta la 10
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (const especial of especiales) {
        for (const tipo of tipos) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
};

crearDeck();

// Función que permite coger una carta de la baraja
const pedirCarta = () => {
    if (deck.length === 0) {
        throw new Error("No quedan cartas disponibles");
    }
    return deck.pop();
};

// Función que retorna el valor de la carta obtenida de la baraja
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    const cartaEspecial = valor === "A" ? 11 : 10;

    return isNaN(valor) ? cartaEspecial : valor * 1;
};

// Turno Computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Empate!')
        } else if (puntosMinimos > 21) {
            alert('La computadora gana!')
        } else if (puntosComputadora > 21) {
            alert('Has ganado!')
        } else {
            alert('La computadora gana!')
        }
    }, 200)
}

// Eventos

// botón pedir
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        deshabilitarPedirCarta();
        deshabilitarDetener();
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        deshabilitarPedirCarta();
        deshabilitarDetener();
        turnoComputadora(puntosJugador);
    }
});

// botón detener
btnDetener.addEventListener("click", () => {
    deshabilitarPedirCarta();
    deshabilitarDetener();

    turnoComputadora(puntosJugador);
});

function deshabilitarDetener() {
    btnDetener.classList.remove('btn-primary');
    btnDetener.classList.add('btn-secondary');
    btnDetener.disabled = true;
}

function deshabilitarPedirCarta() {
    btnPedir.classList.remove('btn-primary');
    btnPedir.classList.add('btn-secondary');
    btnPedir.disabled = true;
}

// btnNuevo
btnNuevo.addEventListener("click", () => {
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerHTML = 0;
    puntosHTML[1].innerHTML = 0;
    btnDetener.disabled = false;
    btnDetener.classList.remove('btn-secondary');
    btnDetener.classList.add('btn-primary');
    btnPedir.disabled = false;
    btnPedir.classList.remove('btn-secondary');
    btnPedir.classList.add('btn-primary');
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
});
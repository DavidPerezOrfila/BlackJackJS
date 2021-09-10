/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Rombos)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Picas)
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;


// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small')


// Función que mezcla la baraja
const crearDeck = () =>{
    // Cartas de la 2 hasta la 10
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (const especial of especiales) {
        for (const tipo of tipos) {
            deck.push(especial + tipo)
        }
    }

    console.log(deck);
    deck = _.shuffle(deck);
    console.log({'deck': deck});
    return deck;
}

crearDeck()

// Función que permite coger una carta de la baraja
const pedirCarta = () => {
    if (deck.length === 0) {
        throw new Error('No quedan cartas disponibles');
    }
    return deck.pop();
}

// Función que retorna el valor de la carta obtenida de la baraja
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length -1);

    const cartaEspecial = (valor === 'A') ? 11 : 10

    return (isNaN(valor)) ? cartaEspecial : valor * 1
}


// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
});
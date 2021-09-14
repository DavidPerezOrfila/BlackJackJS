const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugadores = [];

    // Referencias del HTML

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // Función que inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnPedir.classList.remove('btn-secondary');
        btnPedir.classList.add('btn-primary');
        btnDetener.disabled = false;
        btnDetener.classList.remove('btn-secondary');
        btnDetener.classList.add('btn-primary');
    }

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        deck = [];

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

        return _.shuffle(deck);
    };

    // Función que permite coger una carta de la baraja
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw new Error('No quedan cartas disponibles');
        }
        return deck.pop();
    };

    // Función que retorna el valor de la carta obtenida de la baraja
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1),
            cartaEspecial = (valor === 'A') ? 11 : 10;

        return (isNaN(valor)) ? cartaEspecial : valor * 1;
    };

    //Turnos: 0 = primer jugador y el último turno siempre es para la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
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

    // Turno Computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) {
                break;
            }
        } while ((puntosComputadora < puntosMinimos));
        determinarGanador();
    }

    // Eventos

    // botón pedir
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(),
            puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if ((puntosJugador > 21) || (puntosJugador === 21)) {
            deshabilitarPedirCarta();
            deshabilitarDetener();
            turnoComputadora(puntosJugador);
        }
    });

    // botón detener
    btnDetener.addEventListener('click', () => {
        deshabilitarPedirCarta();
        deshabilitarDetener();

        turnoComputadora(puntosJugadores[0]);
    });

    const deshabilitarDetener = () => {
        btnDetener.classList.remove('btn-primary');
        btnDetener.classList.add('btn-secondary');
        btnDetener.disabled = true;
    }

    const deshabilitarPedirCarta = () => {
        btnPedir.classList.remove('btn-primary');
        btnPedir.classList.add('btn-secondary');
        btnPedir.disabled = true;
    }

    return {
        nuevoJuego: inicializarJuego
    };
})();
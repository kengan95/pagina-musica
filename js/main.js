

// Agrega estos scripts en script.js 

const audioElemento = document.querySelectorAll('.audio');
const imagenesActuales = document.querySelectorAll('.imagen');
const imagenOverlay = document.getElementById('overlayImage');
const overlay = document.getElementById('overlay');
const iconClose = document.getElementById('closeIcon');

let audioVacio = null;

audioElemento.forEach((audio, index) => {
    audio.addEventListener('play', () => {
        if (audioVacio && audioVacio !== audio) {
            audioVacio.pause();
            audioVacio.currentTime = 0; // Vuelve al inicio de la canción anterior
            audioVacio = null;
            overlay.style.display = 'none';
        }

        imagenOverlay.src = imagenesActuales[index].src;
        overlay.style.display = 'flex';
        audioVacio = audio;
    });

    audio.addEventListener('ended', () => {
        audioVacio = null;
        if (index + 1 < audioElemento.length) {
            audioElemento[index + 1].play();
        }
    });
});

iconClose.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.style.display = 'none';
});

imagenesActuales.forEach((imagen, index) => {
    imagen.addEventListener('click', (e) => {
        e.stopPropagation();

        if (audioVacio) {
            audioVacio.pause();
            audioVacio.currentTime = 0; // Vuelve al inicio de la canción anterior
            audioVacio = null;
        }

        audioElemento[index].play();
        imagenOverlay.src = imagenesActuales[index].src;
    });
});

overlay.addEventListener('click', (e) => {
    e.stopPropagation();

    overlay.style.display = 'none';

    if (audioVacio) {
        audioVacio.pause();
        audioVacio.currentTime = 0; // Vuelve al inicio de la canción anterior
        audioVacio = null;
    }
});





















const elementos = document.querySelectorAll('.contenedor__canciones');

function cargarFuncion(entradas, observador) {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('activacion');
      observador.unobserve(entrada.target);
    }
  });
}

const observador = new IntersectionObserver(cargarFuncion, {
  root: null,
  threshold: 0.5,
});

elementos.forEach(elemento => {
  observador.observe(elemento);
});

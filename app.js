document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    navFija();
    crearGaleria();
    scrollNav();
}

function navFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {

        if( sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.main-nav a');
    
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function (e) {
            //prevenir el comportamiento por default.
            e.preventDefault();
            // Config. nuevo comportamiento.
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    // galeria.textContent = 'vamos a crear la galeria';

    for (let i = 1; i <= 12 ; i++)  {
        const image = document.createElement('picture');
        
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="thumb galeria ${i}">
        `;
        
        image.onclick = function() {
        mostrarImagen(i);
        }

        // image.onclick = mostrarImagen(i); // De esta forma se puede hacer pero se manda a llamar automáticamente todo el loop, no identifica a cual imagen se le está dando click.

        galeria.appendChild(image);
    }   
}

function mostrarImagen(img) {
    const image = document.createElement('picture');
        
    image.innerHTML = `
        <source srcset="build/img/grande/${img}.avif" type="image/avif">
        <source srcset="build/img/grande/${img}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${img}.jpg" alt="thumb galeria ${img}">
    `;
    // Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    // Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X'
    cerrarModal.classList.add('boton-cerrar')
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal)
    // Añade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
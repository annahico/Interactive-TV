const buttons = document.getElementsByClassName("button"); //Esta línea selecciona todos los elementos HTML que tienen la clase "button" y los almacena en una variable llamada buttons.
const offScreen = document.getElementById("offScreen"); //Esto selecciona un elemento HTML con el id "offScreen" y lo almacena en la variable offScreen.
const indexContent = document.getElementById("indexContent"); //: Similar al paso anterior, esto selecciona un elemento con el id "indexContent" y lo guarda en la variable indexContent.
const powerBtn = document.getElementById("onOff"); //De manera análoga a los pasos anteriores, esto selecciona un elemento con el id "onOff" y lo asigna a la variable powerBtn.
const selectedChannel = document.getElementsByClassName("selectedChannel"); //Igual que en el primer paso, esta línea selecciona todos los elementos con la clase "selectedChannel" y los almacena en la variable selectedChannel.
const clock = document.querySelector(".clockAndDate"); // Aquí se selecciona el primer elemento en el documento HTML que tiene la clase "clockAndDate" y se asigna a la variable clock.

let Ontv = false; // Se declara una variable Ontv que se utiliza para rastrear si la televisión está encendida o apagada. Inicialmente, está establecida en false para indicar que la televisión está apagada.

indexContent.style.display = "none"; //: Esto oculta el elemento representado por indexContent estableciendo su propiedad de visualización (display) en "none".

powerBtn.addEventListener("click", (e) => { //Se agrega un "escuchador de eventos" al botón de encendido (powerBtn). Cuando se hace clic en este botón, se ejecuta una función que cambia el estado de Ontv (de encendido a apagado o viceversa) y realiza acciones correspondientes, como mostrar u ocultar contenido.
    Ontv = !Ontv;

    if (Ontv) {
        indexContent.style.display = "flex"; //Esta línea establece el estilo de visualización del elemento representado por indexContent en "flex". Esto hace que el contenido dentro de indexContent se muestre como un contenedor flexible, lo que permite el ajuste de su diseño.
        offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1]); // Esto remueve la última clase del atributo class del elemento offScreen. El atributo classList proporciona métodos para añadir, remover y verificar clases en el elemento. En este caso, está eliminando la última clase del elemento.
        updateDisplay(); // Esta función se llama después de cambiar el estado de la televisión (Ontv) y manipular la visualización de indexContent y las clases de offScreen. En el contexto del código proporcionado, se llama tanto cuando la televisión se enciende como cuando se apaga. Cuando la televisión se enciende, se usa para mostrar la hora actual en la pantalla. Cuando la televisión se apaga, se utiliza para limpiar el texto del canal mostrado en la pantalla.
    } else {
        indexContent.style.display = "none"; //Si Ontv es false, esta línea establece el estilo de visualización del elemento indexContent en "none", lo que oculta el contenido dentro de indexContent al apagar la televisión.
        offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1]);
        offScreen.classList.add("portada"); //Si Ontv es false, esta línea añade la clase "portada" al atributo class del elemento offScreen. Esto probablemente aplica algún estilo específico destinado a mostrar una pantalla de inicio o portada cuando la televisión está apagada.
        updateDisplay(); // Limpiar el texto del canal cuando la TV está apagada
    }
});

Array.from(buttons).forEach((item) => { //Se itera sobre cada botón obtenido en la variable buttons. Por cada botón, se agrega un "escuchador de eventos" para manejar el clic del usuario.
    item.addEventListener("click", (event) => {
        if (Ontv) {
            const channelNumber = event.target.id.slice(-1);
            offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1]);
            offScreen.classList.add("Channel" + channelNumber);

            const channelName = getChannelName(channelNumber); // Obtener el nombre del canal
            updateDisplay(channelNumber, channelName); // Actualizar la pantalla con el nombre del canal

            setTimeout(() => {
                indexContent.style.display = "none";
            });
        }
    });
});

function getChannelName(channelNumber) { //Esta función toma un número de canal como entrada y devuelve el nombre del canal correspondiente. Utiliza una estructura de switch para asignar nombres a diferentes números de canal.
    switch (channelNumber) {
        case "1":
            return "Netflix";
        case "2":
            return "HBO";
        case "3":
            return "Amazon Prime";
        case "4":
            return "Disney+";
        case "5":
            return "Sky Showtime";
        case "6":
            return "Apple TV+";
        case "7":
            return "Filming";
        case "8":
            return "Movistar+";
        case "9":
            return "3CAT";
        default:
            return "Unknown Channel";
    }
}

function updateDisplay(channelNumber, channelName) {
    const channelNumberElement = document.getElementById("channelNumber");

    if (Ontv && channelNumber && channelName) {
        channelNumberElement.textContent = `${channelNumber}: ${channelName}`; // Mostrar el número y el nombre del canal
    } else {
        channelNumberElement.textContent = ""; // Limpiar el texto del canal cuando la TV está apagada
    }
}

function updateClock() { // Esta función actualiza el reloj en la pantalla con la hora actual y, si la TV está encendida, también muestra la fecha. Utiliza la función setInterval para actualizar el reloj cada segundo.
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const date = now.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });

    const currentTime = `${hours}:${minutes}:${seconds}`;
    clock.textContent = currentTime;

    if (Ontv) {
        clock.textContent += ` | ${date}`; // Mostrar la fecha solo cuando la TV está encendida
    }
}

setInterval(updateClock, 1000);

const buttons = document.getElementsByClassName("button"); //Esta línea selecciona todos los elementos HTML que tienen la clase "button" y los almacena en una variable llamada buttons.
const offScreen = document.getElementById("offScreen"); //Esto selecciona un elemento HTML con el id "offScreen" y lo almacena en la variable offScreen.
const indexContent = document.getElementById("indexContent"); //Similar al paso anterior, esto selecciona un elemento con el id "indexContent" y lo guarda en la variable indexContent.
const powerBtn = document.getElementById("onOff"); //De manera análoga a los pasos anteriores, esto selecciona un elemento con el id "onOff" y lo asigna a la variable powerBtn.
const selectedChannel = document.getElementsByClassName("selectedChannel"); //Igual que en el primer paso, esta línea selecciona todos los elementos con la clase "selectedChannel" y los almacena en la variable selectedChannel.
const clock = document.querySelector(".clockAndDate"); // Aquí se selecciona el primer elemento en el documento HTML que tiene la clase "clockAndDate" y se asigna a la variable clock.

let Ontv = false; // Se declara una variable Ontv que se utiliza para rastrear si la televisión está encendida o apagada. Inicialmente, está establecida en false para indicar que la televisión está apagada.

indexContent.style.display = "none"; // Esto oculta el elemento representado por indexContent estableciendo su propiedad de visualización (display) en "none".

powerBtn.addEventListener("click", (e) => { //Se agrega un "escuchador de eventos" al botón de encendido (powerBtn). Cuando se hace clic en este botón, se ejecuta una función que cambia el estado de Ontv (de encendido a apagado o viceversa) y realiza acciones correspondientes, como mostrar u ocultar contenido.
    Ontv = !Ontv;

    if (Ontv) {
        indexContent.style.display = "flex";
        offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1]);
        updateDisplay(); // Mostrar la hora actual al encender la TV
    } else {
        indexContent.style.display = "none";
        offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1]);
        offScreen.classList.add("portada");
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
            return "3cat";
        default:
            return "Unknown Channel";
    }
}

function updateDisplay(channelNumber, channelName) { //Esta función actualiza la pantalla con el número y el nombre del canal seleccionado. Si la TV está apagada, simplemente limpia el contenido de la pantalla.
    const channelNumberElement = document.getElementById("channelNumber");

    if (channelNumber && channelName) {
        channelNumberElement.textContent = `${channelNumber}: ${channelName}`; // Mostrar el número y el nombre del canal
    } else {
        channelNumberElement.textContent = ""; // Limpiar el texto del canal cuando la TV está apagada
    }
}

function updateClock() { //Esta función actualiza el reloj en la pantalla con la hora actual y, si la TV está encendida, también muestra la fecha. Utiliza la función setInterval para actualizar el reloj cada segundo.
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

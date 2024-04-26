const buttons = document.getElementsByClassName("button");
const offScreen = document.getElementById("offScreen");
const indexContent = document.getElementById("indexContent");
const powerBtn = document.getElementById("onOff");
const selectedChannel = document.getElementsByClassName("selectedChannel");
const clock = document.querySelector(".clockAndDate");

let Ontv = false;

indexContent.style.display = "none";

powerBtn.addEventListener("click", (e) => {
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

Array.from(buttons).forEach((item) => {
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

function getChannelName(channelNumber) {
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
            return "Filming Channel";
        case "8":
            return "Movistar+";
        case "9":
            return "3cat";
        default:
            return "Unknown Channel";
    }
}

function updateDisplay(channelNumber, channelName) {
    const channelNumberElement = document.getElementById("channelNumber");

    if (channelNumber && channelName) {
        channelNumberElement.textContent = `${channelNumber}: ${channelName}`; // Mostrar el número y el nombre del canal
    } else {
        channelNumberElement.textContent = ""; // Limpiar el texto del canal cuando la TV está apagada
    }
}

function updateClock() {
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

// Obtener referencias a elementos HTML
const currentTimeElement = document.getElementById("current-time");
const currentDateElement = document.getElementById("current-date");
const channelUpButton = document.getElementById("channel-up");
const channelDownButton = document.getElementById("channel-down");
const volumeUpButton = document.getElementById("volume-up");
const volumeDownButton = document.getElementById("volume-down");

// Array de nombres de canales simulados
const channels = ["Netflix", "HBO", "Amazon Prime", "Disney +", "SkyShowtime", "AppleTV"];

// Variables para el estado actual
let currentChannelIndex = 0;
let currentVolume = 50; // Valor inicial del volumen

// Función para actualizar la pantalla de televisión
function updateTVScreen() {
    currentTimeElement.textContent = getCurrentTime();
    currentDateElement.textContent = getCurrentDate();
    document.querySelector(".channel-info h1").textContent = channels[currentChannelIndex];
    document.querySelector(".background-image").style.backgroundImage = `url("${channels[currentChannelIndex]}.jpg")`; // Cambiar la imagen de fondo según el canal
}

// Función para obtener la hora actual en formato HH:MM
function getCurrentTime() {
    const now = new Date();
    return `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;
}

// Función para obtener la fecha actual en formato DD/MM/AAAA
function getCurrentDate() {
    const now = new Date();
    return `${padZero(now.getDate())}/${padZero(now.getMonth() + 1)}/${now.getFullYear()}`;
}

// Función para agregar un cero delante de un número si es menor que 10
function padZero(number) {
    return number < 10 ? "0" + number : number;
}


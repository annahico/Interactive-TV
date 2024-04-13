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


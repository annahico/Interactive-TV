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
        Array.from(buttons).forEach((item) => {
            item.addEventListener("click", (event) => {
                if (Ontv) {
                    offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1]);
                    offScreen.classList.add("Channel" + event.target.id.slice(-1));
                }

                if (Ontv) {
                    indexContent.style.display = "none";
                    const channelNumber = document.getElementById("channelNumber");
                    channelNumber.textContent = event.target.id.slice(-1);
                    setTimeout(() => {
                        channelNumber.textContent = "";
                    }, 1000);
                }
            });
        });
    } else {
        indexContent.style.display = "none";
        offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1]);
        offScreen.classList.add("portada");
    }
});

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const currentTime = `${hours}:${minutes}:${seconds}`;
    clock.textContent = currentTime;

    const date = now.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });

    clock.textContent += ` | ${date}`;
}

setInterval(updateClock, 1000);

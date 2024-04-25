const buttons = document.getElementsByClassName("button")

let arrayButtons = Array.from(buttons)

let offScreen = document.getElementById("offScreen")

let indexContent = document.getElementById("indexContent")
//Aqui están todas las variables necesarias llamdas
const powerBtn = document.getElementById("onOff")

const selectedChannel = document.getElementsByClassName("selectedChannel")

const clock = document.querySelector(".clockAndDate")


let Ontv = false

//Se oculta de salida la pantalla de encendido, de tal forma que solo se harávisible cuando se presione en el Powerbtn

indexContent.style.display = "none"

powerBtn.addEventListener("click", (e) => {

    //Se le da valor booleano a Ontv para controlar el evento click en el boton power del mando
    Ontv = !Ontv


    if (Ontv === true) {
        indexContent.style.display = "flex"
        //mapeado el array de botones de tal forma que podamos añadir o remover clases hara dar lugar al evento "eleccion de canal"
        arrayButtons.map(item => {

            item.addEventListener("click", (evento) => {
                if (Ontv === true) {
                    offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1])
                    //Remueve la clase anterior para no acumular registro de canales clickados

                    offScreen.classList.add("Channel" + evento.target.id.slice(-1))
                }
                //Se esconde la pantalla de inicio y después se ejecuta el número de canal en una esquina durante dos segundos mediante setTimeOut


                if (Ontv === true) {
                    indexContent.style.display = "none"

                    channelNumber.textContent = evento.target.id.slice(-1)
                    setTimeout(() => {
                        channelNumber.textContent = ""     //después de mostrarse el número de canal, su valor vuelve a ser el de un string vacío
                    }, 500)
                }
            })
        })
    }
    else {
        indexContent.style.display = "none"         //si al pulsar power devuelve Ontv false, se quita la pantalla de inicio y la tv queda apagada
        offScreen.classList.remove(offScreen.classList[offScreen.classList.length - 1])
        offScreen.classList.add("portada")
    }
})


function actualizarReloj() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0')
    const segundos = ahora.getSeconds().toString().padStart(2, '0')

    const horaActual = `${horas}:${minutos}:${segundos}`
    clock.textContent = horaActual; // Mostrar la hora

    // Mostrar la fecha
    const fecha = ahora.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    clock.textContent += ` | ${fecha}`
}

// Actualización del reloj cada segundo
setInterval(actualizarReloj, 1000);
// seleccionar elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// nombres de clases
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// obtener item  localstorage
let data = localStorage.getItem("TODO");

// ver si data esta vacio
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    // si data no esta vacio
    LIST = [];
    id = 0;
}

// cargar datos
function loadList(array) {
    array.forEach(function(item) {
        addTarea(item.name, item.id, item.done, item.trash);
    });
}

// limpiar local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// mostar fecha
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("es-ES", options);

// añadir tarea funcion

function addTarea(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// añadir tarea presionando enter
document.addEventListener("keyup", function(even) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // si esta vacio
        if (toDo) {
            addTarea(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // añadir tarea al localstorage 
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});


// comppletar tarea
function completeTarea(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// mevover tarea
function removeTarea(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// crear contenido dinamico

list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeTarea(element);
    } else if (elementJob == "delete") {
        removeTarea(element);
    }

    // añadir al localstorage ( al actualizar)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
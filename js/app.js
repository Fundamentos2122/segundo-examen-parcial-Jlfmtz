const tareaForm = document.forms["nuevaTarea"];
const tareaList = document.getElementById("tareas");
const tareasKey = "tareas";

eventListener();

function eventListener() {
    //Agrega tareas
    tareaForm.addEventListener("submit", addTarea);

    //La página termine de cargar
    document.addEventListener("DOMContentLoaded", showTareas);

    document.addEventListener("DOMContentLoaded", changeStatus);
}

//Funciones

//Agregar Tweet
function addTarea(e) {
    //Detener el envio del formulario
    e.preventDefault();

    //Obtener la información de la tarea
    const titulo = tareaForm["titulo"].value;
    const desc = tareaForm["descripcion"].value;
    const fecha = tareaForm["fecha"].value;
    const newDate = formato(fecha);
    /**
    * Convierte un texto de la forma AAAA-MM-DD a la forma
    * DD/MM/AAAA
    *
    * @param {string} fehcha Texto de la forma AAAA-MM-DD
    * @return {string} texto de la forma DD/MM/AAAA
    *
    */
    function formato(fecha) {
        return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    let now = new Date();
    const id = Date.parse(now);
    const status = 0;

    const tarea = {id,titulo, desc, newDate, status}
    console.log(tarea);

    //Crear el nuevo elemento
    const newTarea = document.createElement("div");

    //Añadir estilos y contenido
    newTarea.className = "border-top";
    newTarea.innerHTML = 
        `<div id="${tarea.id}" class="row elemento-lista">
            <div class="col-9 col-md-10 tarea-titulo">
                <h3>${tarea.titulo}</h3>
            </div>
            <div class="col-3 col-md-2 tarea-fecha">
                ${tarea.newDate}
            </div>
            <div class="col-6 col-md-10 desc-tarea">
                <p>${tarea.desc}</p>
            </div>
        
            <input type="checkbox" name="${tarea.id}" id="${tarea.id}" onclick="changeStatus(this)">
            <label for="complet">completada</label>

        </div>`;

        //Se añade a la lista de tareas
        tareaList.appendChild(newTarea);

        saveTarea(tarea);


}

//Guardar tarea en LocalStorage
function saveTarea(tarea) {
    let tareas = getTareas();

    //Se añade a la lista de tareas
    tareas.push(tarea);

    //Guardar en LocalStorage
    localStorage.setItem(tareasKey, JSON.stringify(tareas));
}

//Obtiene las tareas de LocalStorage
function getTareas() {
    //Obtenemos los datos de LocalStorage
    let tareas = localStorage.getItem(tareasKey);

    //Verificamos si ya existe al menos uno
    if (tareas === null) {
        tareas = [];
    }
    else {
        tareas = JSON.parse(tareas);
    }

    return tareas;
}

//Muestra las tareas guardadas
function showTareas() {
    let tareas = getTareas();

    tareas.forEach(tarea => {
        if(tarea.status === 0){
            //Crear el nuevo elemento
            const newTarea = document.createElement("div");

            //Añadir estilos y contenido
            newTarea.className = "border-top";
            newTarea.innerHTML = 
                `<div id="${tarea.id}" class="row elemento-lista">
                    <div class="col-9 col-md-10 tarea-titulo">
                        <h3>${tarea.titulo}</h3>
                    </div>
                    <div class="col-3 col-md-2 tarea-fecha">
                        ${tarea.newDate}
                    </div>
                    <div class="col-6 col-md-10 desc-tarea">
                        <p>${tarea.desc}</p>
                    </div>
                    
                    <input type="checkbox" name="${tarea.id}" id="${tarea.id}" onclick="changeStatus(this)">
                    <label for="complet">completada</label>
              
                </div>`;

            //Se añade a la lista de tareas
            tareaList.appendChild(newTarea);
        }
    });
}

//Marcar tarea como completada
function changeStatus(checkbox) {
    //Si está marcada ejecuta la condición verdadera.
    if(checkbox.checked){
        document.getElementById(checkbox.id).classList.add("bg-success");
        
    }
    //Si se ha desmarcado se ejecuta el siguiente mensaje.
    else{
        document.getElementById(checkbox.id).classList.remove("bg-success");
    }
}
import {Persona} from "./persona.js";

var persona = null;
export function submitDatos() {
    var nombre = document.querySelector("#nombre").value;
    var apellido = document.querySelector("#apellido").value;
    var edad = document.querySelector("#edad").value;
    var dinero = document.querySelector("#dinero").value;

    if (!datosValidos(nombre, apellido, edad)) return;

    persona = new Persona(nombre,apellido,edad,dinero);
    showData();
}



function showData(){
    console.log(persona);
}

function datosValidos(nombre, apellido, edad) {
    var error = "";
    if (nombre == "" || apellido == "" || edad == "")
        error = "Por favor complete los siguientes datos:\n";
    if (nombre == "") error += "\tNombre\n";
    if (apellido == "") error += "\tApellido\n";
    if (edad == "") error += "\tEdad\n";

    if (error != "") {
        alert(error);
        return false;
    }
    return true;
}

function submit_datos() {
    var nombre = document.querySelector("#nombre").value;
    var apellido = document.querySelector("#apellido").value;
    var edad = document.querySelector("#edad").value;

    if (!DatosValidos(nombre, apellido, edad)) return;

    datos = `Sus datos son:\n\tNombre: ${nombre}\n\tApellido: ${apellido}\n\tEdad: ${edad}`;

    if (edad >= 18) {
        datos += `\n\tY usted es mayor de edad`;
    } else {
        datos += `\n\tY usted es menor de edad`;
    }

    alert(datos);
}

function DatosValidos(nombre, apellido, edad) {
    error = "";
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

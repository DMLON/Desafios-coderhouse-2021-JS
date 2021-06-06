import { Persona } from "./persona.js";

var persona = null;
export function submitDatos() {
    var nombre = document.querySelector("#nombre").value;
    var apellido = document.querySelector("#apellido").value;
    var edad = Number(document.querySelector("#edad").value);
    var dinero = Number(document.querySelector("#dinero").value);

    if (!datosValidos(nombre, apellido, edad, dinero)) return;

    //Creo la persona
    persona = new Persona(nombre, apellido, edad, dinero);

    //Al crear la persona, escondo el login screen
    hideLoginScreen();
}

function hideLoginScreen() {
    var login_container = $("#login-container");

    login_container.fadeOut("slow", () => {
        showPersonInfo();
    });
}

function showPersonInfo() {
    //Primero muestro el welcome title
    var welcome_title = $("#welcome-title");
    var panel_compra_venta = $("#panel-compra-venta");
    var person_container = $("#person-container");

    welcome_title.html(`Bienvenido ${persona.nombre} ${persona.apellido}!`);

    person_container.removeClass("fade");
    person_container.removeClass("custom-hide");

    person_container.fadeIn("slow", () => {
        panel_compra_venta.removeClass("custom-hide").addClass("in");
    });
}

function datosValidos(nombre, apellido, edad, dinero) {
    var error = "";
    if (nombre == "" || apellido == "" || edad == "" || dinero == "") error = "Por favor complete los siguientes datos:\n";

    if (nombre == "") error += "\tNombre\n";
    if (apellido == "") error += "\tApellido\n";
    if (edad == "") error += "\tEdad\n";
    if (dinero == "") error += "\tDinero\n";

    if (Number.isNaN(edad)) {
        error += "Ingrese edad como valor numérico.\n";
    }

    if (Number.isNaN(dinero)) {
        error += "Ingrese dinero como valor numérico.";
    }

    if (error != "") {
        alert(error);
        return false;
    }
    return true;
}

export function test_register(){
    //Creo la persona
    persona = new Persona("Test", "Person", "23", "10000");

    //Al crear la persona, escondo el login screen
    hideLoginScreen();
}

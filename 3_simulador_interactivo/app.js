import { Persona } from "./persona.js";

var persona = null;
export function submitDatos() {
    var nombre = document.querySelector("#nombre").value;
    var apellido = document.querySelector("#apellido").value;
    var edad = Number(document.querySelector("#edad").value);
    var dinero = Number(document.querySelector("#dinero").value);

    if (!datosPersonaValidos(nombre, apellido, edad, dinero)) return;

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

    actualizarPortfolio();
}

function actualizarPortfolio(){
    var person_portfolio_pesos = $("#insumos-pesos");
    person_portfolio_pesos.html(`$${persona.dinero}`);

    var person_portfolio_pesos = $("#insumos-acciones");
    person_portfolio_pesos.html(`${persona.acciones} FORT`);
}

function datosPersonaValidos(nombre, apellido, edad, dinero) {
    var error = "";
    if (nombre == "" || apellido == "" || edad == "" || dinero == "") error = "Por favor complete los siguientes datos:\n";

    if (nombre == "") error += "\tNombre\n";
    if (apellido == "") error += "\tApellido\n";
    if (edad == "") error += "\tEdad\n";
    if (dinero == "") error += "\tDinero\n";

    if (Number.isNaN(edad) || edad <= 0) {
        error += "Ingrese edad como valor numérico positivo.\n";
    }

    if (Number.isNaN(dinero) || dinero <= 0) {
        error += "Ingrese dinero como valor numérico positivo.";
    }

    if (error != "") {
        alert(error);
        return false;
    }
    return true;
}

export function testRegister(){
    //Creo la persona
    persona = new Persona("Test", "Person", "23", "10000");

    //Al crear la persona, escondo el login screen
    hideLoginScreen();
}

export function comprarAcciones(){
    var cantidad = Number(document.querySelector('#comprar-cantidad').value)
    if(!validaAcciones(cantidad)) return;

    var precio = getPrecioActual();
    if(Number.isNaN(precio) || precio == undefined){
        alert("Error de conversión de precio, intente nuevamente.");
        return;
    } 

    persona.comprarAcciones(precio,cantidad);

    actualizarPortfolio();
}

export function venderAcciones(){
    var cantidad = Number(document.querySelector('#vender-cantidad').value)
    if(!validaAcciones(cantidad)) return;

    var precio = getPrecioActual();
    if(Number.isNaN(precio) || precio == undefined){
        alert("Error de conversión de precio, intente nuevamente.");
        return;
    } 

    persona.venderAcciones(precio,cantidad);

    actualizarPortfolio();
}

function getPrecioActual(){
    var precio = document.querySelector('#price').innerHTML
    var precio = Number(precio.split('$')[1])
    return precio;
}

function validaAcciones(cantidad){
    var error = "";
    if (cantidad == "") error = "Por favor ingrese una cantidad a comprar/vender\n";

    if (Number.isNaN(cantidad)) error = "Por favor ingrese una cantidad numérica\n";

    if (error!= "") {
        alert(error);
        return false;
    }
    return true;
}
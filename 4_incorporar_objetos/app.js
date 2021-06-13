import { Accion } from "./accion.js";
import { Persona } from "./persona.js";

var persona = null;
const Acciones = [];

export function submitDatos() {
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let edad = Number(document.querySelector("#edad").value);
    let dinero = Number(document.querySelector("#dinero").value);

    if (!datosPersonaValidos(nombre, apellido, edad, dinero)) return;

    //Creo la persona
    persona = new Persona(nombre, apellido, edad, dinero);

    //Al crear la persona, escondo el login screen
    hideLoginScreen();
}

function hideLoginScreen() {
    let login_container = $("#login-container");

    login_container.fadeOut("slow", () => {
        showPersonInfo();
    });
}

function showPersonInfo() {
    //Primero muestro el welcome title
    let welcome_title = $("#welcome-title");
    let panel_compra_venta = $("#panel-compra-venta");
    let person_container = $("#person-container");

    welcome_title.html(`Bienvenido ${persona.nombre} ${persona.apellido}!`);

    person_container.removeClass("fade");
    person_container.removeClass("custom-hide");

    person_container.fadeIn("slow", () => {
        panel_compra_venta.removeClass("custom-hide").addClass("in");
    });

    actualizarPortfolio();
}

function actualizarPortfolio(){
    let person_portfolio_pesos = $("#insumos-pesos");
    person_portfolio_pesos.html(`$${persona.dinero}`);

    let person_portfolio_acciones = $("#insumos-acciones");

    persona.acciones.map((accion)=>{
        const accion_html = $(`#insumos-acciones-${accion.nombre}`);
        if (!accion_html.length)
            person_portfolio_acciones.append(agregarAccion(accion.nombre,accion.cantidad));
        else {
            accion_html.html(`${accion.cantidad} ${accion.nombre}`)
        }
    });

    
}

function agregarAccion(nombreAccion,cantidad){
    return `<div class="row"><div class="col-md-6"></div><div class="col-md-6"><p id="insumos-acciones-${nombreAccion}">${cantidad} ${nombreAccion}</p></div></div>`
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
    let cantidad = Number(document.querySelector('#comprar-cantidad').value)
    if(!validaAcciones(cantidad)) return;

    let precio = getPrecioActual();
    if(Number.isNaN(precio) || precio == undefined){
        alert("Error de conversión de precio, intente nuevamente.");
        return;
    } 

    persona.comprarAcciones(precio,cantidad,'FORT');

    actualizarPortfolio();
}

export function venderAcciones(){
    let cantidad = Number(document.querySelector('#vender-cantidad').value)
    if(!validaAcciones(cantidad)) return;

    let precio = getPrecioActual();
    if(Number.isNaN(precio) || precio == undefined){
        alert("Error de conversión de precio, intente nuevamente.");
        return;
    } 

    persona.venderAcciones(precio,cantidad,'FORT');

    actualizarPortfolio();
}

function getPrecioActual(){
    let precio = document.querySelector('#price').innerHTML
    precio = Number(precio.split('$')[1])
    return precio;
}

function validaAcciones(cantidad){
    let error = "";
    if (cantidad == "") error = "Por favor ingrese una cantidad a comprar/vender\n";

    if (Number.isNaN(cantidad) || cantidad <=0) error = "Por favor ingrese una cantidad numérica positiva\n";

    if (error!= "") {
        alert(error);
        return false;
    }
    return true;
}


window.submitDatos = submitDatos;
window.testRegister = testRegister;
window.comprarAcciones = comprarAcciones;
window.venderAcciones = venderAcciones;

window.onload = () => {
    Acciones.push(new Accion("FORT",'chart'));
};
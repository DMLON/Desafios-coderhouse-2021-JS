import { Accion } from "./accion.js";
import { Persona } from "./persona.js";
import { createModalAndShow } from "./modalUtils.js";

var persona = null;
let selectedAccion = "";
const Acciones = [];

/**
 * Guarda y valida los datos ingresados de la persona y hace una cadena para mostrar esconder el login y mostrar la pagina principal
 */
export function submitDatos() {
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let edad = Number($("#edad").val());
    let dinero = Number($("#dinero").val());

    if (!datosPersonaValidos(nombre, apellido, edad, dinero)) return;

    //Creo la persona
    persona = new Persona(nombre, apellido, edad, dinero);

    //Al crear la persona, escondo el login screen
    hideLoginScreen();
    savePersona(persona);
}


/**
 * Esconde la pagina de login
 */
function hideLoginScreen(fade=true) {
    let login_container = $("#login-container");

    if(fade){
        login_container.fadeOut("slow", () => {
            showPersonInfo();
        });
    }
    else{
        login_container.hide();
        showPersonInfo();
    }
}

/**
 * Muestra la página para poder comprar y vender acciones
 */
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

/**
 * Actualiza el portfolio de la persona modificando sus valores de acciones
*/
function actualizarPortfolio() {
    let person_portfolio_pesos = $("#insumos-pesos");
    person_portfolio_pesos.html(`$${persona.dinero}`);

    let person_portfolio_acciones = $("#insumos-acciones");

    //Por cada accion de la persona creo un elemento si no existe o cambio el valor si existe
    persona.acciones.map((accion) => {
        const accion_html = $(`#insumos-acciones-${accion.nombre}`);
        if (!accion_html.length) person_portfolio_acciones.append(agregarAccion(accion.nombre, accion.cantidad));
        else {
            accion_html.html(`${accion.cantidad} ${accion.nombre}`);
        }
    });
}

/**
 * Agrega un elemento de accion dado la cantidad comprada y el nombre si no existe
 * @param {string} nombreAccion Nombre de la accion a crear
 * @param {Number} cantidad Cantidad de la accion a asignar
 * @returns HTML como string
 */
function agregarAccion(nombreAccion, cantidad) {
    return `<div class="row"><div class="col-md-6"></div><div class="col-md-6"><p id="insumos-acciones-${nombreAccion}">${cantidad} ${nombreAccion}</p></div></div>`;
}


/**
 * Valida los datos de una persona
 * @param {string} nombre Nombre de la persona
 * @param {string} apellido Apellido de la persona
 * @param {Number} edad Edad de la persona > 0
 * @param {Number} dinero Dinero de la persona > 0
 * @returns Bool representando si son validos o no
 */
function datosPersonaValidos(nombre, apellido, edad, dinero) {
    let error = "";
    let hasError = false;
    if (nombre == "" || apellido == "" || edad == "" || dinero == "") hasError = true;

    if(hasError) error = "<p>Por favor complete los siguientes datos:</p><ul>";

    if (nombre == "") error += "<li>Nombre</li>";
    if (apellido == "") error += "<li>Apellido</li>";
    if (edad == "") error += "<li>Edad</li>";
    if (dinero == "") error += "<li>Dinero</li>";

    if(hasError) error += "</ul>";

    if (Number.isNaN(edad) || edad <= 0) {
        error += "<p>Ingrese edad como valor numérico positivo.</p>";
    }

    if (Number.isNaN(dinero) || dinero <= 0) {
        error += "<p>Ingrese dinero como valor numérico positivo</p>";
    }

    if (error != "") {
        createModalAndShow("Error",error);
        return false;
    }
    return true;
}


/**
 * Funcion de testeo para agilizar la creación de una persona en el login
 */
export function testRegister() {
    //Creo la persona
    persona = new Persona("Test", "Person", "23", "10000");

    //Al crear la persona, escondo el login screen
    hideLoginScreen();
    savePersona(persona);
}


/**
 * Compra accion a la persona que está efectuando la accion una cierta cantidad que pueda
 */
export function comprarAcciones() {
    let cantidad = Number(document.querySelector("#comprar-cantidad").value);
    if (!validaAcciones(cantidad)) return;

    let precio = getPrecioActual();
    if (Number.isNaN(precio) || precio == undefined) {
        createModalAndShow("Error", "<p>Error de conversión de precio, intente nuevamente.</p>");
        return;
    }

    persona.comprarAcciones(precio, cantidad, selectedAccion);

    actualizarPortfolio();
    savePersona(persona);
}

/**
 * Vende accion a la persona que está efectuando la accion una cierta cantidad que pueda 
*/
export function venderAcciones() {
    let cantidad = Number(document.querySelector("#vender-cantidad").value);
    if (!validaAcciones(cantidad)) return;

    let precio = getPrecioActual();
    if (Number.isNaN(precio) || precio == undefined) {
        createModalAndShow("Error", "<p>Error de conversión de precio, intente nuevamente.</p>");
        return;
    }

    persona.venderAcciones(precio, cantidad, selectedAccion);

    actualizarPortfolio();
    savePersona(persona);
}


/**
 * Obtengo el precio actual de la accion seleccionada
 */
function getPrecioActual() {
    let precio = document.querySelector(`#price_${selectedAccion}`).innerHTML;
    precio = Number(precio.split("$")[1]);
    return precio;
}

/**
 * Valida el valor ingresado en cantida que no sea negativo o no sea un numero
 * @param {Number} cantidad Cantidad a validad
 * @returns Bool representando si es valida o no
 */
function validaAcciones(cantidad) {
    let error = "";
    if (cantidad == "") error = "Por favor ingrese una cantidad a comprar/vender";

    if (Number.isNaN(cantidad) || cantidad <= 0) error = "Por favor ingrese una cantidad numérica positiva";

    if (error != "") {
        createModalAndShow("Error", `<p>${error}</p>`);
        return false;
    }
    return true;
}

/**
 * Guarda una persona en el local storage
 * @param {Persona} persona 
 */
function savePersona(persona){
    localStorage.setItem('persona',JSON.stringify(persona));
}

/**
 * Carga la persona del local storage y le actualiza el portfolio en el frontend
 */
function loadLastPersona(){
    //Si no hay persona me voy
    if(localStorage.getItem('persona') == null) return null;
    
    persona = JSON.parse(localStorage.getItem('persona'));
    hideLoginScreen(false);
    actualizarPortfolio();
}

function clearPersonaLocalStorage(){
    localStorage.removeItem('persona');
    location.reload();
}

//Shorhand de Document ready
$(() => {
    // Agrego un callback que se ejecuta al cambiar de acción, esto me cambia la acción seleccionada
    $("#acciones-select").change(function () {
        var data = $(this).val();
        selectedAccion = data.split("/")[0];
    });

        // Asignación de callbacks en botones
    $('#test-register').on("click",testRegister);
    $('#buy-accion-btn').on('click',comprarAcciones);
    $('#sell-accion-btn').on('click',venderAcciones);
    $('#register-btn').on('click',submitDatos);
    $('#logout').on('click',clearPersonaLocalStorage);

    // Creo 3 acciones genericas
    // Puedo crear más acá y de forma automatica se actualiza la pagina (Agrega un chart entre minimo y máximo de valor, agrega un select para comprar o vender la accion
    // Y tambien agrega un boton para cambiar la visualizacion de las acciones)
    Acciones.push(new Accion("FORT", "chart-container", "token-selector-container", "acciones-select", 10, 200));
    Acciones.push(new Accion("FART", "chart-container", "token-selector-container", "acciones-select", 3000, 5000));
    Acciones.push(new Accion("POTAT", "chart-container", "token-selector-container", "acciones-select", 2, 5));
    Acciones.push(new Accion("BANAN", "chart-container", "token-selector-container", "acciones-select", 10, 1000));

    // Hago un trigger para guardar la selectedAccion
    $("#acciones-select").trigger("change");

    loadLastPersona();
});

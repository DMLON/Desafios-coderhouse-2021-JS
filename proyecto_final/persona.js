import { createModalAndShow } from "./modalUtils.js";

export class Persona {
    constructor(nombre, apellido, edad, dinero) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dinero = dinero;
        this.acciones = [];
    }

    /**
     * Compra una cierta cantidad de una accion para la persona
     * @param {Number} precio Precio de la accion a comprar
     * @param {Number} cantidad Cantidad de la accion a comprar
     * @param {string} nombre_accion Nombre de la accion a manipular
     */
    comprarAcciones(precio, cantidad, nombre_accion) {
        if (this.dinero >= precio * cantidad) {
            this.dinero -= precio * cantidad;
            const accion = this.acciones.find(x=>x.nombre == nombre_accion)
            if(accion == null){
                //Si es null, la agrego
                this.acciones.push({
                    nombre: nombre_accion,
                    cantidad: cantidad
                });
            }else{
                accion.cantidad += cantidad;
            }
            
        } else {
            createModalAndShow("Error","No tenés suficiente dinero!");
        }
    }

    /**
     * Vende una cierta cantidad de una accion de la persona
     * @param {Number} precio Precio de la accion a vender
     * @param {Number} cantidad Cantidad de la accion a vender
     * @param {string} nombre_accion Nombre de la accion a manipular
     */
    venderAcciones(precio, cantidad, nombre_accion) {
        const accion = this.acciones.find(x=>x.nombre == nombre_accion)
        if(accion == null){
            createModalAndShow("Error","No tenés suficientes acciones!");
            return;
        }

        if(accion.cantidad >= cantidad){
            this.dinero += precio * cantidad;
            accion.cantidad -= cantidad;
        }
        else {
            createModalAndShow("Error","No tenés suficientes acciones!");
        }
    }
}



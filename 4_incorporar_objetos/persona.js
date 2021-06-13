export class Persona {
    constructor(nombre, apellido, edad, dinero) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dinero = dinero;
        this.acciones = [];
    }

    comprarAcciones(precio, cantidad, nombre_accion) {
        if (this.dinero >= precio * cantidad) {
            this.dinero -= precio * cantidad;
            this.acciones.find(x=>x.nombre == nombre_accion)
            this.acciones[nombre_accion] += cantidad;
        } else {
            alert("No tenés suficiente dinero!");
        }
    }

    venderAcciones(precio, cantidad, nombre_accion) {
        if(this.acciones >= cantidad){
            this.dinero += precio * cantidad;
            this.acciones -= cantidad;
        }
        else {
            alert("No tenés suficientes acciones!");
        }
    }
}



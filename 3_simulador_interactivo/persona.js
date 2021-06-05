export class Persona {
    constructor(nombre, apellido, edad, dinero) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dinero = dinero;
        this.acciones = 0;
    }

    comprarAcciones(precio, cantidad) {
        if (this.dinero >= precio * cantidad) {
            this.dinero -= precio * cantidad;
            this.acciones += cantidad;
        } else {
            alert("No tenés suficiente dinero!");
        }
    }

    venderAcciones(precio, cantidad) {
        if(this.acciones >= cantidad){
            this.dinero += precio * cantidad;
            this.acciones -= cantidad;
        }
        else {
            alert("No tenés suficientes acciones!");
        }
    }
}



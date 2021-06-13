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
            alert("No tenés suficiente dinero!");
        }
    }

    venderAcciones(precio, cantidad, nombre_accion) {
        const accion = this.acciones.find(x=>x.nombre == nombre_accion)
        if(accion == null){
            alert("No tenés suficientes acciones!");
            return;
        }

        if(accion.cantidad >= cantidad){
            this.dinero += precio * cantidad;
            accion.cantidad -= cantidad;
        }
        else {
            alert("No tenés suficientes acciones!");
        }
    }
}



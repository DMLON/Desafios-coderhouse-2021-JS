import { Chart_Accion } from "./chart.js";

export class Accion {
    constructor(nombre, chart_container,button_container,option_container,minVal,maxVal, updateTime = 1000) {
        this.nombre = nombre;
        this.currentPrice = 0;
        this.chart_container = $(`#${chart_container}`);
        this.button_container = $(`#${button_container}`);
        this.minVal = minVal;
        this.maxVal = maxVal;

        this._updateTime = updateTime;

        this._lastDate = new Date("11 Feb 2021 GMT").getTime();
        this._precios = [];
        this._TICKINTERVAL = 24 * 60 * 60 * 1000;
        this._XAXISRANGE = 9* 24 * 60 * 60 * 1000;

        this._intervalId = undefined;
        
        //Le asigno al button container un boton para la accion nueva
        const button_token = $(`<button id="change_token_${nombre}" class="btn btn-success btn__100px btn__token m-3">${nombre}</button>`);
        button_token.on('click',()=>{
            $('div[id $= "_chart_price"]').removeClass("in").addClass("custom-hide fade");
            $(`#${this.nombre}_chart_price`).removeClass("custom-hide").addClass("in");
        });
        this.button_container.append(button_token);

        this.option_container = $(`#${option_container}`);
        this.option_container.append(`<option>${nombre}/PESO</option>`);

        //Creo el chart asociado a la accion
        this.chart_container.append(`<div id="${nombre}_chart_price"><h2 id="price_${nombre}">Precio:</h2><div id="chart_${nombre}"></div></div>`);
        this._associated_chart = new Chart_Accion(this,`chart_${nombre}`,minVal,maxVal);
        this._associated_chart.buildChart();
        this.startInterval();
    }

    _getNewSeries(baseval, yrange) {
        var newDate = baseval + this._TICKINTERVAL;
        this._lastDate = newDate;
    
        for (var i = 0; i < this._precios.length - 10; i++) {
            // IMPORTANT
            // we reset the x and y of the data which is out of drawing area
            // to prevent memory leaks
            this._precios[i].x = newDate - this._XAXISRANGE - this._TICKINTERVAL;
            this._precios[i].y = 0;
        }
    
        this._precios.push({
            x: newDate,
            y:
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
                yrange.min,
        });
    }

    //Permite obtener el valor temporal y eje y random para el proximo valor
    _getDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        while (i < count) {
            var x = baseval;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
                yrange.min;
    
                this._precios.push({
                x,
                y,
            });
            this._lastDate = baseval;
            baseval += this._TICKINTERVAL;
            i++;
        }
    }
    
    //Limpia el intervalo
    clearInterval(){
        window.clearInterval(this.intervalId)
        this.intervalId = undefined;
    }

    //Empieza la variacion de vlaores para el grafico de acciones
    startInterval() {
        //Si invervalID es distinto de null significa que ya setee el intervalo
        if (this.intervalId != null) return;
        
        //Necesario declarar self si voy a usarlo dentro de otro ambito (En este caso el de setInterval)
        const self = this;
        this._getDayWiseTimeSeries(this._lastDate, 10, {
            min: this.minVal,
            max: this.maxVal,
        });

        
        this._intervalId = window.setInterval(function () {
            self._getNewSeries(self._lastDate, {
                min: self.minVal,
                max: self.maxVal,
            });

            if(self._associated_chart != null){
                self._associated_chart.chart.updateSeries([
                    {
                        data: self._precios,
                    },
                ]);
            }

            self.currentPrice = self._precios.slice(-1)[0].y;
            document.querySelector(`#price_${self.nombre}`).innerHTML = `Precio: $${self.currentPrice}`;
        }, this._updateTime);
    }

    _resetData() {
        // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
        this._precios = this._precios.slice(this._precios.length - 10, this._precios.length);
    }
}


import { Chart_Accion } from "./chart.js";

export class Accion {
    constructor(nombre, chartId, minVal,maxVal, updateTime = 1000) {
        this.nombre = nombre;
        this.currentPrice = 0;

        this.minVal = minVal;
        this.maxVal = maxVal;

        this._updateTime = updateTime;

        this._lastDate = new Date("11 Feb 2021 GMT").getTime();
        this._precios = [];
        this._TICKINTERVAL = 24 * 60 * 60 * 1000;
        this._XAXISRANGE = 9* 24 * 60 * 60 * 1000;

        this._intervalId = undefined;

        this._associated_chart = new Chart_Accion(this,chartId);
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
    
    clearInterval(){
        window.clearInterval(this.intervalId)
        this.intervalId = undefined;
    }


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
            document.querySelector('#price').innerHTML = `Precio: $${self.currentPrice}`;
        }, this._updateTime);
    }

    _resetData() {
        // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
        this._precios = this._precios.slice(this._precios.length - 10, this._precios.length);
    }
}


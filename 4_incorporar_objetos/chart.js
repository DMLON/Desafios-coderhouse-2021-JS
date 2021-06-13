export class Chart_Accion {
    constructor(accion_asociada,chartId){
        this.accion_asociada = accion_asociada;
        this.chart = undefined;
        this.chartId = chartId;
    }

    buildChart(){
        var options = {
            series: [
                {
                    data: accion_asociada.precios.slice(),
                },
            ],
            chart: {
                id: "realtime",
                height: 400,
                type: "line",
                animations: {
                    enabled: true,
                    easing: "linear",
                    dynamicAnimation: {
                        speed: 100,
                    },
                },
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
                foreColor: 'black',
            },
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: `Acciones ${accion_asociada.nombre}/PESO`,
                align: "left",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                type: "datetime",
                range: accion_asociada._XAXISRANGE,
            },
            yaxis: {
                max: 200,
            },
            legend: {
                show: false,
            },
        };
    
        this.chartchart = new ApexCharts(document.querySelector(`#${chartId}`), options);
        this.chartchart.render();
    }
}

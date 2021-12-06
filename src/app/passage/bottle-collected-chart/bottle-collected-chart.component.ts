import {Component, OnInit} from '@angular/core';
import {StockChart} from 'angular-highcharts';
import {PassageService} from "../passage.service";
import {Passage} from "../data/Passage";
import * as Highcharts from 'highcharts/highstock';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let Export = require('highcharts/modules/exporting');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
Export(Highcharts);

@Component({
    selector: 'app-bottle-collected-chart',
    templateUrl: './bottle-collected-chart.component.html',
    styleUrls: ['./bottle-collected-chart.component.css']
})
export class BottleCollectedChartComponent implements OnInit {

    dataChart: Array<Object> = [];
    chart!: StockChart;

    constructor(
        private passageService: PassageService
    ) {
    }

    ngOnInit(): void {
        this.getAllPassages()
    }

    getAllPassages() {
        this.passageService.getAllPassages().subscribe(
            passages => {
                this.formatPassages(passages)
                this.formattingChart()
            }
        )
    }

    formatPassages(passages: Passage[]) {
        passages.map(
            passage => {
                this.dataChart.push([new Date(passage.createdAt.slice(0, 10)).getTime(), passage.bottles_collected])
            }
        )
    }

    formattingChart() {
        this.chart = new StockChart({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Évolution des bouteilles collectées'
            },
            xAxis: {
                title: {
                    text: null
                },
                type: "datetime",
                tickPixelInterval: 200
            },
            yAxis: {
                title: {
                    text: 'Bouteilles collectées'
                }
            },
            plotOptions: {
                series: {
                    pointIntervalUnit: 'day'
                }
            },
            series: [{
                name: 'Bouteilles collectées',
                showInLegend: false,
                data: this.dataChart,
                type: 'column',
                dataGrouping: {
                    approximation: 'sum',
                    enabled: true,
                    forced: true,
                    units: [
                        ['day', [1]]
                    ]
                }
            }],
            credits: {
                enabled: false
            }
        })
    }
}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

    @Input() answers: Array<{translation: string, type: number}>;
    @Input() backgroundColors: string[];
    @Input() data: number[];

    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            display: false
        }
    };

    public pieChartLabels: Label[];
    public pieChartData: number[];
    public pieChartType: ChartType = 'pie';
    public pieChartColors;

    constructor() { }

    ngOnInit() {
        this.createChart();
    }

    private createChart() {
        const tmp = [];
        this.answers.forEach(answer => tmp.push(100 / this.answers.length));
        this.pieChartColors = [{ backgroundColor: this.backgroundColors }];
        this.pieChartData = tmp;
        this.pieChartLabels = this.answers.map(a => a.translation);
    }

    public updateChart(data: number[]) {
        this.pieChartData = data;
    }
}

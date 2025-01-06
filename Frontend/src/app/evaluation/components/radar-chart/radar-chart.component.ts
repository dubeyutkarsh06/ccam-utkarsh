import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RadialChartOptions, ChartDataSets, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import { UuidService } from '../../../shared/services/uuid/uuid.service';
import {EvaluationService} from '../../services/evaluation/evaluation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit, OnChanges {

  @Input() labels: Label[];
  @Input() scoring: {};
  @Input() comparison: {};
  @Input() rating_text: {bad: "", okay: "", good: ""};
  @Input() startLabel: string;

  constructor(
    private uuidService: UuidService,
    private evaluationService: EvaluationService,
    private httpSerivce: HttpService,
  ) { }

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
      callbacks: {
        label(tooltipItem, data) {
          // tslint:disable-next-line: max-line-length
          return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Math.round(parseFloat(''+ data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])) + '%';
        }
      }
    },
    scale: {
      ticks: {
        stepSize: 10,
        max: 100,
        min: 0,
        callback(value: any, index: any, values: any): string | number {
          return "";
        }
      }
    },

  };
  public radarChartColors: Color[] = [
    {
      borderColor: 'rgb(197,90,17)',
      backgroundColor: 'rgba(197,90,17, 0.1)'
    },
    {
      borderColor: 'rgb(189,215,238)',
      backgroundColor: 'rgba(189,215,238, 0.1)'
    },
    {
      borderColor: 'rgb(46,117,182)',
      backgroundColor: 'rgba(46,117,182, 0.1)'
    },
    {
      borderColor: 'rgb(32,56,100)',
      backgroundColor: 'rgba(32,56,100,0.1)'
    }
  ];
  public radarChartLabels: Label[];
  public radarChartData: ChartDataSets[];
  public radarChartType: ChartType = 'radar';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.comparison.currentValue !== undefined && this.uuidService.getUuid() !== changes.comparison.currentValue.uuid) {
      let included = false;
      for (let i=0; i < this.radarChartData.length; i++) {
        if (this.radarChartData[i].label === changes.comparison.currentValue.uuid) {
          included = true;
        }
      }
      if(!included) {
        const uuid = changes.comparison.currentValue.uuid;
        const scores = changes.comparison.currentValue.scores;
        this.createChartData(scores).then(res => {
          const chartData = [];
          res.map(elem => {
            chartData.push(elem * 10);
          });
          this.radarChartData = this.radarChartData.concat([{data: chartData, label: uuid}]);
        });
      }
    }
  }

  ngOnInit() {
    this.radarChartLabels = this.labels;
    this.radarChartData = [{data: this.initChartData(this.scoring), label: this.startLabel}];
    this.initDefaultCharts();
  }
  private initChartData(scoring): number[] {
    const data = new Array(this.radarChartLabels.length).fill(0);
    for (const category of Object.keys(scoring)) {
      data[this.radarChartLabels.indexOf(category)] = scoring[category];
    }
    return data;
  }

  private async createChartData(scoring): Promise<number[]> {
    const data = new Array(this.radarChartLabels.length).fill(0);
    for (const category of Object.keys(scoring)) {
      const categoryTranslation = await this.evaluationService.getScoringCategoryTranslation(category);
      data[await this.radarChartLabels.indexOf(categoryTranslation['category'])] = scoring[category];
    }
    return data;
  }

  private createStateChartData(scores, uuid) {
    this.createChartData(scores).then(res => {
      const chartData = [];
      res.map(elem => {
        chartData.push(elem);
      });
      this.radarChartData = this.radarChartData.concat([{data: chartData, label: uuid}]);
    });
  }

  private initDefaultCharts() {
    this.httpSerivce.getScoringDefaultCharts().subscribe(res => {
      console.log(res);
      const charts = []
      res.map(elem => {
        const ind = charts.findIndex(x => x.label == elem.state)
        if (ind == -1) {
          charts.push({label: elem.state, data: {[elem.categoryName]: elem.percentage}})
        } else {
          charts[ind].data[elem.categoryName] = elem.percentage
        }
      })
      console.log(charts)
      charts.map(elem => {
        this.createStateChartData(elem.data, elem.label)
      })
    });
  }

}

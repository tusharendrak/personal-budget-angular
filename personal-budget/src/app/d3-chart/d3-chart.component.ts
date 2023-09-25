import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements OnInit, AfterViewInit {
  public myBudgetData: any[] = [];

  private svg: any;
  private margin = 10;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors:any[] = [
    'yellow',
    'black',
    '#3da2eb',
    '#fd6b19',
    '#4caf50',
    'blue',
    '#79d548',
    '#f44336',
    '#214ff3',
    '#ff5722',
];

  constructor(private dataService: DataService) {}
  ngAfterViewInit(): void {
    this.dataService.fetchData().subscribe((data) => {
      this.dataService.setData(data);
       this.myBudgetData = this.dataService.getData().myBudget;

      this.createSvg();
      this.drawChart();
    });
  }

  private createSvg(): void {
    this.svg = d3
      .select('#pie-chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private drawChart(): void {

    const pie = d3.pie<any>().value((d: any) => {
      console.log(d);
      return Number(d.budget);
    });

    this.svg
      .selectAll('pieces')
      .data(pie(this.myBudgetData))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => (this.colors[i]))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.myBudgetData))
      .enter()
      .append('text')
      .text((d: any) => {
        console.log(d.data.title);
        return d.data.title;
      })
      .attr(
        'transform',
        (d: any) => 'translate(' + labelLocation.centroid(d) + ')'
      )
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }

  ngOnInit(): void {}
}
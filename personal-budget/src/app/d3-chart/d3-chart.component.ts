import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.createSvg();
    this.dataService.data$.subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        this.drawBars(data);
      }
    });
    this.dataService.getMLFrameworks(); // Trigger data fetch
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);
  
    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  
    // Create the Y-axis linear scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.stars)])
      .nice()
      .range([this.height, 0]);
  
    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));
  
    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.name))
      .attr("y", (d: any) => y(d.stars))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.stars))
      .attr("fill", "black"); // You can change the color as needed
  }
}
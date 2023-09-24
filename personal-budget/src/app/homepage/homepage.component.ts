import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource: {
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
    labels: string[];
  } = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
      },
    ],
    labels: [],
  };

constructor(private http: HttpClient) {

}

ngOnInit() : void{
  this.http.get('http://localhost:3000/budget')
  .subscribe((res: any) => {
    console.log(res)
    for (var i = 0; i < res.myBudget.length; i++) {
      this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
      this.dataSource.labels[i] = res.myBudget[i].title;
      this.createChart();
  }
  });
}

createChart() {
  const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Check if a chart already exists on this canvas
      if (Chart.instances[0]) {
        // Destroy the existing chart
        Chart.instances[0].destroy();
      }
      else if (Chart.instances[1]) {
        // Destroy the existing chart
        Chart.instances[1].destroy();
      }

      // Create the new chart
      const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
      });
      console.log('Chart is working.');
    } else {
      console.error('Canvas context not available.');
    }
  } else {
    console.error('Canvas element not found.');
  }
}



// createChart() {
//   var ctx = document.getElementById('myChart').getContext('2d');
//   var myPieChart = new Chart(ctx, {
//       type: 'pie',
//       data: this.dataSource
//   });
//   console.log("chart is working ?")
// }

}

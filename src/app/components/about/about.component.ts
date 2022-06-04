import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @Input() item!: string; // decorate the property with @Input()


  public title: string;
  public subtitle: string;
  public email: string;
  flag = false;


  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  single = [
    {
      name: 'JavaScript',
      value: 8940000,
    },
    {
      name: 'CSS',
      value: 5000000,
    },
    {
      name: 'HTML',
      value: 7200000,
    },
    {
      name: 'PHP',
      value: 6200000,
    },
  ];

  constructor(private _http: HttpClient) {
    this.title = 'Jorge Romero';
    this.subtitle = 'Desarrollador Web';
    this.email = 'jorge@jorge.com';
    
    // Object.assign(this, { single });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  cambiarFlag() {
    this.flag = !this.flag;
  }
}

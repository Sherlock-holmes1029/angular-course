import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CalculaterCardComponent } from './calculater-card/calculater-card.component';
import { TableComponent } from "./table/table.component";
import { Record } from './table/table.module';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, CalculaterCardComponent, TableComponent],
})
export class AppComponent {

  record?:Record[];

  onCalculate(record: Record[]) {
    this.record = [...record];
  }
  
}

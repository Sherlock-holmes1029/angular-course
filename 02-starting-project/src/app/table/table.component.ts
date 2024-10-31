import { Component, Input } from '@angular/core';
import { Record } from './table.module';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
@Input() tableRecord?:Record[];


}

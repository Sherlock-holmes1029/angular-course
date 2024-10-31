import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecordData, type Record } from '../table/table.module';
import { CalculateService } from './calculater.services';


@Component({
  selector: 'app-calculater-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculater-card.component.html',
  styleUrl: './calculater-card.component.css'
})
export class CalculaterCardComponent {

  @Output() records=new EventEmitter<Record[]>()

  initialInvestment!:number;
  duration!:number;
  expectedReturn!:number;
  annualInvestment!:number;

  constructor(private calculateServices:CalculateService){}

  onSubmit(){
    this.records.emit(this.calculateServices.calculateInvestmentResults({
      initialInvestment:this.initialInvestment,
      duration:this.duration,
      expectedReturn:this.expectedReturn,
      annualInvestment:this.annualInvestment
    }))
  }


}

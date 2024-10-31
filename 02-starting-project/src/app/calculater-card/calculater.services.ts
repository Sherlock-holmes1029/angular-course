import { Injectable } from "@angular/core";
import { RecordData } from "../table/table.module";


@Injectable({providedIn: 'root'})
export class CalculateService{


    calculateInvestmentResults(data:RecordData) {
        const {expectedReturn,duration,annualInvestment,initialInvestment}= data
      const annualData = [];
      let investmentValue = initialInvestment;
    
      for (let i = 0; i < duration; i++) {
        const year = i + 1;
        const interestEarnedInYear = investmentValue * (expectedReturn / 100);
        investmentValue += interestEarnedInYear + annualInvestment;
        const totalInterest =
          investmentValue - annualInvestment * year - initialInvestment;
        annualData.push({
          year: year,
          interest: interestEarnedInYear,
          valueEndOfYear: investmentValue,
          annualInvestment: annualInvestment,
          totalInterest: totalInterest,
          totalAmountInvested:initialInvestment + annualInvestment * year,
        });
      }
    
      return annualData;
    }


}
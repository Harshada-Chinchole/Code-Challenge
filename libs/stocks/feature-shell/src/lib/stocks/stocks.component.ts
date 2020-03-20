import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { STOCKS_CONSTANTS } from '../stocks-constants';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public subscription: Subscription;
  public stockPickerForm: FormGroup;
  public symbol: string;
  public maxDate: Date;
  public startDate: Date;
  public endDate: Date;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
    //if date range is invalid startDate will be same as endDate.
    this.subscription = this.stockPickerForm.valueChanges.subscribe(value => {
      const { startDate, endDate } = value;
      if (endDate != null && endDate < startDate){    
        this.stockPickerForm.patchValue({startDate : new Date(endDate)});
      }
    })
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, startDate, endDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, STOCKS_CONSTANTS.MAX, new Date(startDate), new Date(endDate) );
    }  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

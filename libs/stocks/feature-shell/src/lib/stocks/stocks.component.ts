import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { STOCKS_CONSTANTS } from './stocks.constants';
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
  public period: string;
  public timePeriods = STOCKS_CONSTANTS.timePeriods;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
  }

  ngOnInit() {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
    this.subscription = this.stockPickerForm.valueChanges.pipe(
      debounceTime(STOCKS_CONSTANTS.DEBOUNCE_TIME)).subscribe(value => {
      if (this.stockPickerForm.valid) {
        const { symbol, period } = value;
        this.priceQuery.fetchQuote(symbol, period);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

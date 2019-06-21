import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from './../../services/alert/alert.service';
import { CoinlibService } from './../../services/api/coinlib.service';
import { Coin } from '../coin/model/coin';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {

  coin: Object = {};
  coins: Coin[] = [];

  // filtro
  public symbols = [
    { name: 'Euro', symbol: 'EUR' },
    { name: 'Dólar', symbol: 'USD' },
    { name: 'Bitcoin', symbol: 'BTC' }
  ];

  form: FormGroup;
  submitted: boolean;
  filter = '';

  // paginação
  // TO_DO

  constructor(
    private coinlibService: CoinlibService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      symbol: [null, Validators.required]
    });
  }

  clearForm() {
    this.form.reset();
    this.alertService.success('Resultados em Dólar (padrão)');
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.filter = '';
      return;
    }
    this.filter = this.form.value.symbol;
    this.fillCoinsList(this.filter, 1);
  }

  private fillCoinsList(symbol, page) {
    this.coinlibService.getCoinList(symbol, page)
    .then(data => {
      this.coins = data.coins;
    })
    .catch(err => {
      this.alertService.error(err.message);
    });
  }

  /* private fillCoinList() {
    this.coinlibService.
  }

  private fillGlobalList() {
    this.coinlibService.
  } */

}

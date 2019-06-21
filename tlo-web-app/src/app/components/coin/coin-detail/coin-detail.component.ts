import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CoinlibService } from 'src/app/services/api/coinlib.service';
import { AlertService } from './../../../services/alert/alert.service';
import { Coin } from './../model/coin';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit, OnDestroy {

  private subscription: any = null;
  private coin: Coin = null;

  constructor(
    private coinlibService: CoinlibService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const s = params['symbol'];
      this.alertService.success(`Detalhes para criptomoeda ${s} - implementando...`, true);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

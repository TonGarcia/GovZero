import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-politicians',
  templateUrl: 'politicians.html'
})
export class PoliticiansPage {

  politiciansType: string = '0';

  constructor(public navCtrl: NavController) {

  }

}

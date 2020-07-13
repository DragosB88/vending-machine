import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

export interface StorageParams {
  addMoney: boolean;
  panel: boolean;
}

@Component({
  selector: 'vending-display',
  templateUrl: './vending-display.component.html',
  styleUrls: ['./vending-display.component.scss'],
})
export class VendingDisplayComponent implements OnInit {
  products: any[] = [];
  message: any[];
  displayedCode: string = '0';
  addMoney: boolean;
  creditVal: number = 0;
  showPanel: boolean;
  storedVals: StorageParams;

  constructor(ProductsService: ProductsService) {
    // obtain state from session storage
    this.products = this.checkIfStored(
      sessionStorage.getItem('objectsArray'),
      this.products,
      ProductsService.getProducts()
    );

    if (sessionStorage.getItem('show')) {
      this.storedVals = JSON.parse(sessionStorage.getItem('show'));

      this.addMoney = this.checkIfStored(
        this.storedVals.addMoney,
        this.addMoney,
        false
      );

      this.showPanel = this.checkIfStored(
        this.storedVals.panel,
        this.showPanel,
        false
      );

      this.creditVal = this.checkIfStored(
        sessionStorage.getItem('credit'),
        this.creditVal,
        0
      );
    }
  }

  // check if value is stored
  checkIfStored(storedVal, actualVal, notStored) {
    if (storedVal) {
      return (actualVal = JSON.parse(storedVal));
    } else {
      return (actualVal = notStored);
    }
  }

  toggleScreens(val) {
    this.addMoney = val;
    this.showPanel = true;
    this.saveInSession('show', { addMoney: val, panel: true });
  }
  receiveQChange($event) {
    this.products = $event;
  }
  receiveCode($event) {
    this.displayedCode = $event;
  }
  updatedCredit($event) {
    this.creditVal = $event;
  }
  // Session storage
  saveInSession(key, val): void {
    sessionStorage.setItem(key, JSON.stringify(val));
  }
  ngOnInit(): void {}
}

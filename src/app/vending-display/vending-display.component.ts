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
    // Obtain state from session storage - TODO: refactor area - streamline storage check
    if (sessionStorage.getItem('objectsArray')) {
      this.products = JSON.parse(sessionStorage.getItem('objectsArray'));
    } else {
      this.products = ProductsService.getProducts();
    }

    if (sessionStorage.getItem('show')) {
      this.storedVals = JSON.parse(sessionStorage.getItem('show'));

      if (this.storedVals.addMoney) {
        this.addMoney = this.storedVals.addMoney;
      } else {
        this.addMoney = false;
      }

      if (this.storedVals.panel) {
        this.showPanel = this.storedVals.panel;
      } else {
        this.showPanel = false;
      }

      if (sessionStorage.getItem('credit')) {
        this.creditVal = JSON.parse(sessionStorage.getItem('credit'));
      } else {
        this.creditVal = 0;
      }
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

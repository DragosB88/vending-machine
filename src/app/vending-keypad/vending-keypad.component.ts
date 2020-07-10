import { ProductsService } from './../products.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vending-keypad',
  templateUrl: './vending-keypad.component.html',
  styleUrls: ['./vending-keypad.component.scss'],
})
export class VendingKeypadComponent implements OnInit {
  // credit;
  buttons;
  displayedProducts = [];
  initialized;

  result;
  previousItem;
  isCodeValid;
  @Output() changeQuantity = new EventEmitter();

  public data: any = [];
  constructor(ProductsService: ProductsService) {
    // this.credit = '0';

    this.initialized = false;
    this.isCodeValid = true;
    this.result = '0';

    this.previousItem = '';

    this.buttons = [
      'AC',
      'CE',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
      '1',
      '0',
      'Confirm',
    ];
    // get products array
    this.displayedProducts = ProductsService.getProducts();
  }

  evaluate(item) {
    if (isNaN(item)) {
      // if it is not a number
      if (item === 'AC') {
        this.result = '0';
        this.initialized = false;
      } else if (item === 'CE') {
        this.result = this.clearEntry(this.result, this.previousItem);
      } else if (item === 'Confirm') {
        this.evaluateOrder(this.result);
        this.result = '0';
        this.initialized = false;
      }
    } else {
      if (this.typeCode(item, this.result, this.initialized) < 100)
        this.result = this.typeCode(item, this.result, this.initialized);
    }
  }

  clearEntry(res, prev) {
    if (prev != 'Confirm') {
      if (res.length > 1) {
        res = res.slice(0, -1);
      } else {
        res = '0';
        this.initialized = false;
      }
    } else {
      res = res;
    }
    return res;
  }

  typeCode(item, res, init) {
    // if it is a number
    if (res === '0' && !init) {
      res = item;
      init = true;
    } else {
      res += item;
    }
    return res;
  }

  evaluateOrder(itemCode) {
    if (parseInt(itemCode) > 9 && parseInt(itemCode) < 30) {
      // revert to original index
      itemCode = itemCode - 10;
      let rObj = this.displayedProducts.map((obj, index) => {
        if (index === itemCode && obj.qty) {
          obj.qty--;
        } else if (!obj.qty) {
          this.invalidCommand();
        }
        return obj;
      });
      this.changeQuantity.emit(rObj);
      this.saveInSession('objectsArray', rObj);
    } else {
      this.invalidCommand();
    }
  }

  invalidCommand() {
    this.isCodeValid = false;
    setTimeout(() => {
      this.isCodeValid = true;
    }, 3000);
  }

  saveInSession(key, val): void {
    sessionStorage.setItem(key, JSON.stringify(val));
  }

  ngOnInit(): void {
    // if (this.credit) this.credit = `Current credit is ${this.credit}`;
  }
}

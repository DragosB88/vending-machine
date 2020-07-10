import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
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
    this.displayedProducts = ProductsService.getProducts();
  }

  evaluate(item) {
    if (isNaN(item)) {
      // if it is not a number
      console.log('it is not a number');
      if (item === 'AC') {
        this.result = '0';
        this.initialized = false;
      } else if (item === 'CE') {
        this.result = this.clearEntry(this.result, this.previousItem);
      } else if (item === 'Confirm') {
        console.log('CONFIRM SIR!');
        this.evaluateOrder(this.result);
      }
    } else {
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
    console.log('it is a number');
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
      let x = this.displayedProducts.map((obj, index) => {
        if (index === itemCode) {
          obj.qty--;
        }
        return obj;
      });
      // debugger;
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ', x);
      // console.log(
      //   'array after %%%%%%%%%%%%% ',
      //   this.displayedProducts.map((obj) => {
      //     if (obj[itemCode - 10]) {
      //       obj.qty--;
      //     }
      //     return obj;
      //   })
      // );
    } else {
      this.isCodeValid = false;
      setTimeout(() => {
        this.isCodeValid = true;
      }, 3000);
    }
  }

  ngOnInit(): void {
    // if (this.credit) this.credit = `Current credit is ${this.credit}`;
  }
}

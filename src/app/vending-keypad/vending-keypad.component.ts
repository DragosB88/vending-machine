import { ProductsService } from './../products.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { VendindKeypad } from './vending-keypad-types';

@Component({
  selector: 'vending-keypad',
  templateUrl: './vending-keypad.component.html',
  styleUrls: ['./vending-keypad.component.scss'],
})
export class VendingKeypadComponent implements OnInit, VendindKeypad {
  credit: number;

  @Input() topUp = false;
  @Output() updateCredit = new EventEmitter();
  @Output() changeQuantity = new EventEmitter();
  @Output() updateCode = new EventEmitter();

  initialized = false;
  isCodeValid = true;
  isCreditValid = true;

  showData = true;
  result = '0';
  displayedProducts = [];

  previousItem = '';
  invalidText = '';

  buttons = [
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

  errorCategory;
  errorStack: string[];
  // destruct params
  errorStackInv: string;
  errorStackEmp: string;
  errorStackIns: string;
  errorStackMax: string;
  validCode: boolean;
  validCredit: boolean;

  constructor(ProductsService: ProductsService) {
    // group and destruct
    this.errorStack = [
      'Invalid code',
      'Slot empty',
      'Insuficient funds',
      'Max $99 Credit',
    ];

    [
      this.errorStackInv,
      this.errorStackEmp,
      this.errorStackIns,
      this.errorStackMax,
    ] = this.errorStack;

    this.errorCategory = {
      isCodeValidated: 'isCodeValid',
      isCreditValidated: 'isCreditValid',
    };
    ({
      isCodeValidated: this.validCode,
      isCreditValidated: this.validCredit,
    } = this.errorCategory);

    // get products array
    this.displayedProducts = ProductsService.getProducts();

    this.credit = sessionStorage.getItem('credit')
      ? JSON.parse(sessionStorage.getItem('credit'))
      : (this.credit = 0);
  }

  evaluate(item) {
    if (isNaN(item)) {
      // if it is not a number
      if (item === 'AC') {
        this.reset();
      } else if (item === 'CE') {
        this.result = this.clearEntry(this.result, this.previousItem);
      } else if (item === 'Confirm') {
        if (!this.topUp) {
          this.evaluateOrder(this.result);
        } else {
          this.addCredit(this.result);
        }
        this.reset();
      }
    } else if (this.typeCode(item, this.result, this.initialized) < 100) {
      this.result = this.typeCode(item, this.result, this.initialized);
    }
    if (!this.topUp) {
      this.updateCode.emit(this.result);
    }
  }

  clearEntry(res, prev) {
    if (prev !== 'Confirm') {
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

  addCredit(sum) {
    if (this.credit + parseInt(sum) < 100) {
      this.credit += parseInt(sum);
      this.updateCredit.emit(this.credit);
      this.saveInSession('credit', this.credit);
    } else {
      this.errorHandler(this.validCredit, this.errorStackMax);
    }
  }

  reset() {
    this.result = '0';
    this.initialized = false;
  }

  evaluateOrder(itemCode) {
    if (parseInt(itemCode) > 9 && parseInt(itemCode) < 30) {
      // revert to original index
      itemCode -= 10;

      const rObj = this.displayedProducts.map((obj, index) => {
        if (index === itemCode) {
          if (obj.qty) {
            if (this.credit - parseInt(obj.price) >= 0) {
              obj.qty--;

              this.credit -= parseInt(obj.price);
              this.updateCredit.emit(this.credit);
              this.saveInSession('credit', this.credit);
            } else {
              // display error
              this.errorHandler(this.validCredit, this.errorStackIns);
            }
          } else if (obj.qty === 0) {
            // display error
            this.errorHandler(this.validCode, this.errorStackEmp);
          }
        }
        return obj;
      });

      this.changeQuantity.emit(rObj);
      this.saveInSession('objectsArray', rObj);
    } else {
      this.errorHandler(this.validCode, this.errorStackInv);
    }
  }

  // Error handling
  errorHandler(errFlag, errText) {
    this.invalidText = errText;
    if (errFlag === 'isCodeValid') {
      this.isCodeValid = false;
      setTimeout(() => {
        this.isCodeValid = true;
      }, 3000);
    } else if (errFlag === 'isCreditValid') {
      this.isCreditValid = false;
      setTimeout(() => {
        this.isCreditValid = true;
      }, 3000);
    }
    this.errorDelay();
  }

  errorDelay() {
    this.showData = false;
    setTimeout(() => {
      this.showData = true;
    }, 3000);
  }

  // Session storage
  saveInSession(key, val): void {
    sessionStorage.setItem(key, JSON.stringify(val));
  }
  ngOnInit(): void {}
}

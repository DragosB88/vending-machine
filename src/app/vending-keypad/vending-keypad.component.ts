import { ProductsService } from './../products.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export interface ErrorCategories {
  isCodeValid: string;
  isCreditValid: string;
}

@Component({
  selector: 'vending-keypad',
  templateUrl: './vending-keypad.component.html',
  styleUrls: ['./vending-keypad.component.scss'],
})
export class VendingKeypadComponent implements OnInit {
  credit: number;
  buttons: any[];
  displayedProducts: any[] = [];
  initialized: boolean;
  isSlotPopulated: boolean;
  showData: boolean;

  invalidText: string;
  result: string;
  previousItem: string;
  isCodeValid: boolean;
  isCreditValid: boolean;

  errorStack: string[];
  errorCategory: ErrorCategories;
  @Input() topUp: boolean;
  @Output() updateCredit = new EventEmitter();
  @Output() changeQuantity = new EventEmitter();
  @Output() updateCode = new EventEmitter();
  constructor(ProductsService: ProductsService) {
    this.initialized = false;
    this.isCodeValid = true;
    this.isCreditValid = true;
    this.isSlotPopulated = true;
    this.topUp = false;
    this.showData = true;
    this.result = '0';

    this.errorStack = [
      'Invalid code',
      'Slot empty',
      'Insuficient funds',
      'Max $99 Credit',
    ];
    this.errorCategory = {
      isCodeValid: 'isCodeValid',
      isCreditValid: 'isCreditValid',
    };

    this.previousItem = '';
    this.invalidText = '';
    if (sessionStorage.getItem('credit')) {
      this.credit = JSON.parse(sessionStorage.getItem('credit'));
    } else {
      this.credit = 0;
    }

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
        this.reset();
      } else if (item === 'CE') {
        this.result = this.clearEntry(this.result, this.previousItem);
      } else if (item === 'Confirm') {
        if (!this.topUp) {
          this.evaluateOrder(this.result);
          this.reset();
        } else {
          this.addCredit(this.result);
          this.reset();
        }
      }
    } else if (this.typeCode(item, this.result, this.initialized) < 100) {
      this.result = this.typeCode(item, this.result, this.initialized);
    }
    if (!this.topUp) {
      this.updateCode.emit(this.result);
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

  addCredit(sum) {
    if (this.credit + parseInt(sum) < 100) {
      this.credit += parseInt(sum);
      this.updateCredit.emit(this.credit);
      this.saveInSession('credit', this.credit);
    } else {
      this.errorHandler(this.errorCategory.isCreditValid, this.errorStack[3]);
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

      // TODO: refactor this area
      // ===================================================
      const rObj = this.displayedProducts.map((obj, index) => {
        if (index === itemCode) {
          if (obj.qty) {
            if (this.credit - parseInt(obj.price) >= 0) {
              obj.qty--;

              this.credit -= parseInt(obj.price);
              this.updateCredit.emit(this.credit);
              this.saveInSession('credit', this.credit);
            } else {
              this.errorHandler(
                this.errorCategory.isCreditValid,
                this.errorStack[2]
              );
            }
          } else if (obj.qty === 0) {
            this.errorHandler(
              this.errorCategory.isCodeValid,
              this.errorStack[1]
            );
          }
        }
        return obj;
      });
      // ===================================================

      this.changeQuantity.emit(rObj);
      this.saveInSession('objectsArray', rObj);
    } else {
      this.errorHandler(this.errorCategory.isCodeValid, this.errorStack[0]);
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

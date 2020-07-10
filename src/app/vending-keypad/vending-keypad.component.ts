import { ProductsService } from './../products.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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
      this.exceedAmount();
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
              this.insuficinetFunds();
            }
          } else if (obj.qty === 0) {
            this.slotEmpty();
          }
        }
        return obj;
      });
      // ===================================================

      this.changeQuantity.emit(rObj);
      this.saveInSession('objectsArray', rObj);
    } else {
      this.invalidCommand();
    }
  }

  // Error handling - TODO: refactor area
  invalidCommand() {
    this.invalidText = 'Invalid code';
    this.isProdInvalid();
  }

  slotEmpty() {
    this.invalidText = 'Slot empty';
    this.isProdInvalid();
  }

  isProdInvalid() {
    this.showData = false;
    this.isCodeValid = false;
    setTimeout(() => {
      this.showData = true;
      this.isCodeValid = true;
    }, 3000);
  }

  insuficinetFunds() {
    this.invalidText = 'Insuficient funds';
    this.isCreditInvalid();
  }

  exceedAmount() {
    this.invalidText = 'Max $99 Credit';
    this.isCreditInvalid();
  }

  isCreditInvalid() {
    this.showData = false;
    this.isCreditValid = false;
    setTimeout(() => {
      this.showData = true;
      this.isCreditValid = true;
    }, 3000);
  }

  // Session storage
  saveInSession(key, val): void {
    sessionStorage.setItem(key, JSON.stringify(val));
  }
  ngOnInit(): void {}
}

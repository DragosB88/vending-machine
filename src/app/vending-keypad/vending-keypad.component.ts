import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vending-keypad',
  templateUrl: './vending-keypad.component.html',
  styleUrls: ['./vending-keypad.component.scss'],
})
export class VendingKeypadComponent implements OnInit {
  credit;
  buffer;
  buttons;

  initialized;

  result;
  previousItem;
  currentItem;
  constructor() {
    this.credit = '0';
    this.buffer = '0';

    this.initialized = false;

    this.result = '0';

    this.previousItem = '';
    this.currentItem = '';

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
  }
  evaluate(item) {
    // if (this.result != '0') {
    //   this.previousItem = this.currentItem;
    //   this.currentItem = item;
    //   console.log(this.previousItem, this.currentItem);
    // }

    if (isNaN(item)) {
      // if it is not a number
      console.log('it is not a number');
      if (item === 'AC') {
        this.result = '0';
        this.initialized = false;
      } else if (item === 'CE') {
        this.result =
          this.previousItem != 'Confirm'
            ? this.result.slice(0, -1)
            : this.result;
      }
    } else {
      // if it is a number
      console.log('it is a number');
      if (this.result === '0' && !this.initialized) {
        this.result = item;
        this.initialized = true;
      } else {
        this.result += item;
      }
    }

    console.log('EVALUATE', item);
    // if (isNaN(item)) {
    //   console.log('It cannot be converted to number');
    //   if (item === 'Add $') {
    //     this.credit += item;
    //   }
    // }
  }

  ngOnInit(): void {
    // if (this.credit) this.credit = `Current credit is ${this.credit}`;
  }
}

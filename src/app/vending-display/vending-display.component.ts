import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vending-display',
  templateUrl: './vending-display.component.html',
  styleUrls: ['./vending-display.component.scss'],
})
export class VendingDisplayComponent implements OnInit {
  products: any[] = [];
  message: any[];
  displayedCode: string = '0';
  constructor(ProductsService: ProductsService) {
    this.products = JSON.parse(sessionStorage.getItem('objectsArray'));

    if (this.products === null) {
      this.products = ProductsService.getProducts();
    }
  }
  receiveQChange($event) {
    this.products = $event;
  }
  receiveCode($event) {
    this.displayedCode = $event;
  }
  ngOnInit(): void {}
}

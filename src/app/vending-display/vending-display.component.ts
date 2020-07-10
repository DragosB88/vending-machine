import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vending-display',
  templateUrl: './vending-display.component.html',
  styleUrls: ['./vending-display.component.scss'],
})
export class VendingDisplayComponent implements OnInit {
  products = [];
  constructor(ProductsService: ProductsService) {
    this.products = ProductsService.getProducts();
  }

  ngOnInit(): void {}
}

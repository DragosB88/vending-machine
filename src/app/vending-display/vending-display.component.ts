import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vending-display',
  templateUrl: './vending-display.component.html',
  styleUrls: ['./vending-display.component.scss'],
})
export class VendingDisplayComponent implements OnInit {
  products;
  vendingSlots = [];
  constructor(ProductsService: ProductsService) {
    this.products = ProductsService.getProducts();

    // insert items into vending machine
    for (const item of this.products) {
      if (item.qty > 10) {
        const diffQtyItem = Object.assign({}, item, { qty: 10 });
        this.vendingSlots.push(diffQtyItem);

        item.qty = item.qty - 10;
        this.vendingSlots.push(item);
      } else {
        this.vendingSlots.push(item);
      }
    }

    // make sure that the number of items displayed is not bigger than the available vending machine slots
    this.checkNumberOfItems(this.vendingSlots);
    console.log('final array ', this.vendingSlots);
  }

  checkNumberOfItems(items) {
    if (items.length >= 20) {
      console.log('Vending machine display limit exceeded');
      items.splice(20);
    } else if (items.length === 20) {
      console.log('Vending machine display has reached its limit');
    } else {
      console.log('Vending machine display still has available item slots');
    }
  }

  ngOnInit(): void {}
}

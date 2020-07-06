import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  foodItems = [
    { name: 'Snickers', id: 0, qty: 20, price: 2 },
    { name: 'Twix', id: 1, qty: 12, price: 3 },
    { name: 'Milky Way', id: 2, qty: 27, price: 1.5 },
    { name: 'Oreos', id: 3, qty: 8, price: 4 },
    { name: 'Rice Crispy Treats', id: 4, qty: 11, price: 8 },
    { name: 'Corn Nuts', id: 5, qty: 4, price: 7 },
    { name: 'Granola Bars', id: 6, qty: 14, price: 11 },
    { name: 'Water', id: 7, qty: 8, price: 4 },
    { name: 'Mountain Dew', id: 8, qty: 16, price: 4 },
    { name: 'Pepsi', id: 9, qty: 12, price: 3 },
    { name: 'Coke', id: 10, qty: 22, price: 3 },
    { name: 'Sprite', id: 11, qty: 9, price: 3 },
  ];
  getProducts() {
    return this.foodItems;
  }
}

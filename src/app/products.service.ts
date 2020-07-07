import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  // max item qty = 20
  foodItems = [
    {
      name: 'Snickers',
      alias: 'Snickers',
      prodClass: 'prod-snickers',
      id: 0,
      qty: 19,
      price: 2,
    },
    {
      name: 'Twix',
      alias: 'Twix',
      prodClass: 'prod-twix',
      id: 1,
      qty: 12,
      price: 3,
    },
    {
      name: 'Milky Way',
      alias: 'Milky',
      prodClass: 'prod-milky',
      id: 2,
      qty: 20,
      price: 1.5,
    },
    {
      name: 'Oreos',
      alias: 'Oreo',
      prodClass: 'prod-oreo',
      id: 3,
      qty: 8,
      price: 4,
    },
    {
      name: 'Rice Crispy Treats',
      alias: 'Rice',
      prodClass: 'prod-rice-treats',
      id: 4,
      qty: 11,
      price: 8,
    },
    {
      name: 'Corn Nuts',
      alias: 'Nuts',
      prodClass: 'prod-corn-nuts',
      id: 5,
      qty: 4,
      price: 7,
    },
    {
      name: 'Granola Bars',
      alias: 'Granola',
      prodClass: 'prod-bars',
      id: 6,
      qty: 14,
      price: 11,
    },
    {
      name: 'Water',
      alias: 'Aqua',
      prodClass: 'prod-aqua',
      id: 7,
      qty: 8,
      price: 4,
    },
    {
      name: 'Mountain Dew',
      alias: 'Dew',
      prodClass: 'prod-mountain-dew',
      id: 8,
      qty: 16,
      price: 4,
    },
    {
      name: 'Pepsi',
      alias: 'Pepsi',
      prodClass: 'prod-pepsi',
      id: 9,
      qty: 12,
      price: 3,
    },
    {
      name: 'Coke',
      alias: 'Coke',
      prodClass: 'prod-coke',
      id: 10,
      qty: 20,
      price: 3,
    },
    {
      name: 'Fanta',
      alias: 'Fanta',
      prodClass: 'prod-fanta',
      id: 11,
      qty: 9,
      price: 3,
    },
  ];
  getProducts() {
    return this.foodItems;
  }
}

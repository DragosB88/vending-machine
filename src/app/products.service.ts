import { Injectable } from '@angular/core';
import { FoodItemsService } from './types';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) {
    // uncomment to set products (first time) TODO: check if db is empty
    // this.setDBProducts(this.foodItems);
  }
  vendingSlots: any[] = [];
  // TODO: implement with Firebase
  // max item qty = 20
  foodItems: FoodItemsService[] = [
    {
      name: 'Snickers',
      alias: 'Snickers',
      prodClass: 'prod-snickers',
      id: 0,
      qty: 11,
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
      price: 2,
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

  // productCat = this.firestore.collection('vendingProducts').doc('products');

  // SET FIRESTORE PRODUCTS
  setDBProducts(data) {
    // this.firestore
    //   .collection('vendingProducts') // collection name on Cloud Firestore
    //   .add(Object.assign({}, data)); // it only accepts objects, thus arrays must be converted
    this.firestore
      .collection('vendingProducts')
      .doc('products')
      .set(Object.assign({}, data));
  }

  // GET FIRESTORE PRODUCTS
  getDBProducts() {
    return this.firestore.collection('vendingProducts').doc('products').get();

    // return this.firestore
    //   .doc('vendingProducts/1UPkj6su0EScAKKUgHuL')
    //   .valueChanges();
    // return this.firestore.collection('vendingProducts').snapshotChanges();
    // you can use either:
    // .valueChanges()
    // or .snapshotChanges()
    // return this.firestore.collection('vendingProducts').snapshotChanges();

    // you can either use:
    // .valueChanges()
    // .snapshotChanges()
    // .stateChanges()
    // or .auditTrail()
  }

  getProducts() {
    // insert items into vending machine
    for (const item of this.foodItems) {
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
    return this.vendingSlots;
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
}

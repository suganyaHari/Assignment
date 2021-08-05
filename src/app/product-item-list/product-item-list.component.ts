import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.css']
})
export class ProductItemListComponent implements OnInit {

  searchText: string;
  showOnlyInStock: boolean;
  productItems = [
    { category: "Sporting Goods", price: "$49.99", inStock: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", inStock: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", inStock: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", inStock: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", inStock: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", inStock: true, name: "Nexus 7" }
  ]

  constructor() {
    this.searchText = "";
    this.showOnlyInStock = false;
  }

  ngOnInit(): void {

  }

  getItems() {
    return this.productItems.filter(item =>
      ((this.searchText && this.searchText.length > 0 
        && item.name.indexOf(this.searchText) != -1) 
        || !this.searchText
        || item.name.toLocaleLowerCase().includes(this.searchText.toLowerCase())
      )
      && ((this.showOnlyInStock && item.inStock) 
      || !this.showOnlyInStock)
    )
  }

  getCategories() {
    var categories = this.getItems().map(item => item.category);
    var uniqueCategories = categories.filter((c, i, d) => d.indexOf(c) === i);
    return uniqueCategories;
  }

  getProductsFromCategories(category: string) {
    return this.getItems().filter(item => item.category == category);
  }

  getColor(category: string) {
    switch (category) {
      case 'Electronics': return 'cyan';
      case 'Sporting Goods':
      default: return 'white'
    }
  }

}

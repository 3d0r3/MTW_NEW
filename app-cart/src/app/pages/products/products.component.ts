import {Component, OnDestroy, inject, OnInit} from '@angular/core';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import {AsyncPipe} from "@angular/common";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ItemListComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: string = "";
  searchInput: string = "";


  constructor(
    private _cartService: CartService,
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }
  ngOnDestroy(): void {
  }

  public filteredProducts: any[] = [];

  getAllCategories() {
    this._cartService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories)
      console.log(this.categories[0])
    });
  }
  getByCategory(category: string) {
    this._cartService.getProductsByCategory(category).subscribe(products =>{
        this.products = products;
      console.log(this.products)
    })
  }
  agregar(event: any) {
    this._cartService.addCart(event);
  }
  buscarProducto() {
    if (this.selectedCategory != "") {
      this.getByCategory(this.selectedCategory);
    } else {
      this.getAllProducts();
    }
  }
  filterProducts(event: any) {
    console.log(event.target.value)
    this.selectedCategory = event.target.value;
  }
  getAllProducts() {
    this._cartService.getAllProducts().subscribe(products =>{
      this.products = products;
      console.log(this.products)
    })
  }

}

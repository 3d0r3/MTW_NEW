import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject ,Observable,map, Subject} from 'rxjs';
const API_URL: string = 'http://mtwe33page.com.mx/api/cart/v1';

@Injectable({
    providedIn: 'root'
})
export class CartService {


    cartItems: any[] = []
    public categories: any[] = []
    public selectedProduct = new Subject<any>();
  //Estos son los ejemplos del BehaviorSubject con esto se pasa el valor de estas funciones
    calculateSubtotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    getTotalItemsCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    constructor(
        private http: HttpClient
    ) { }

  //Funcion que nos permite agregar u producto al carrito
    addCart(item: any) {
        this.cartItems.push(item);
        this.getTotalItemsCart.next(this.cartItems.length);
        this.calculateSubtotal.next(this._calculateSubtotal());
    }
    //Funcion que nos permite Eliminar un producto del carrito
    removeCart(index: number) {
        this.cartItems.splice(index, 1);
        this.getTotalItemsCart.next(this.cartItems.length);
        this.calculateSubtotal.next(this._calculateSubtotal());
    }

    //Esta es la funcion que nos permite saber el subtotal de los productos agregados
    private _calculateSubtotal():number{
        return this.cartItems.reduce((accumulator, currentItem)=>{
            return accumulator + currentItem.unitPrice;
        },0);
    }
    getHealth(): Observable<any>{
        return this.http.get<any>(`${API_URL}/health`)
    }
  getProductsByCategory(categoria: string): Observable<any> {
    const body = {
      category: categoria
    };
    return this.http.post<any>(`${API_URL}/getProductsByCategory`, body).pipe(
      map(response => {
        console.log(response)
        return response.products;
      })
    );
  }
  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${API_URL}/categories`).pipe(
      map(response => {
        console.log(response)
        return response.categories;
      })
    );
  }
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${API_URL}/allProducts`).pipe(
      map(response => {
        console.log(response)
        console.log(response.products)
        console.log("getAllProducts en cart.service.ts")
        return response.products;
      })
    );
  }

}

import { RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
    private offcanvasService = inject(NgbOffcanvas);
    private cartService = inject(CartService);
    totalItemsCart: number = 0;
    itemsCart: any[] = [];
    subTotal: number = 0;


    constructor() {
        this.cartService.getTotalItemsCart.subscribe((totalItems: number) => {
            console.log("El total del carrito es: ", totalItems)
            this.totalItemsCart = totalItems;
        });

            this.cartService.calculateSubtotal.subscribe((subTotal: number) => {
            this.subTotal = subTotal;
        });
    }
    ngOnDestroy(): void {
        this.cartService.getTotalItemsCart.unsubscribe();
    }
    openEnd(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'end' });

        this.itemsCart = this.cartService.cartItems;
    }

    removeCart(i: number){
        if(confirm('¿Estas seguro de que quieres quitar el producto?')){
            this.cartService.removeCart(i);
        }
    }
}

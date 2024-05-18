import { RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private offcanvasService = inject(NgbOffcanvas);
  //Aqui estamos importando el CartService para poder obtener las funciones de calcular
  private cartService = inject(CartService);
  //Aqui es donde declaramos la variable que tendra el subtotal
  subTotal: number = 0;

  constructor() {
    //Aqui es donde se suscribe el footer a la funcion que se encuentra en el cartService
        this.cartService.calculateSubtotal.subscribe((subTotal: number) => {
        this.subTotal = subTotal;
    });
}
}


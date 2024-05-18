import { Component, EventEmitter, Input, OnDestroy, Output, inject } from '@angular/core';
import { MockProductsService } from '../../services/mock-products.service';

@Component({
    selector: 'app-item-list',
    standalone: true,
    imports: [],
    templateUrl: './item-list.component.html',
    styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnDestroy {
    @Input({ required: true }) items: any;
    @Input() labelButton1?: string
    @Input() labelButton2?: string

    @Output() onClickButton1: EventEmitter<string> = new EventEmitter<string>();
    @Output() onClickButton2: EventEmitter<string> = new EventEmitter<string>();
    //Declaración de servicios
    productService = inject(MockProductsService);
    constructor() { }
    //Destruir al cerrar o cambiar componente
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
    //Variable para guardar productos
    clickButton1(item: any) {
        this.onClickButton1.emit(item);
    }
    clickButton2() {
        this.onClickButton2.emit("Se pulsó el botón 2");
    }
}

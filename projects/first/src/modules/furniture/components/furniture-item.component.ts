import { Component, Input } from '@angular/core';
import { Furniture } from '@fabelio/domains/furniture/models/furniture';

@Component({
  selector: 'fabelio-furniture-item-component',
  templateUrl: './furniture-item.component.html'
})
export class FurnitureItemComponent {
  @Input() furniture: Furniture;
}

import { Furniture } from './furniture';
import { Type } from 'class-transformer';
import { forwardRef } from '@angular/core';

export class FurnitureList {
  furnitureStyles: string[];

  @Type(forwardRef(() => Furniture) as any)
  products: Furniture[];
}

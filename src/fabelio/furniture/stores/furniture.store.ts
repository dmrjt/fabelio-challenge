import { Injectable } from '@angular/core';
import { Store } from '@fabelio/core/store/store';
import { INIT_UI_STATE } from '@fabelio/core/store/states';
import { FurnitureState } from './furniture.state';
import { FurnitureList } from '../models/furniture-list';
import { Furniture } from '../models/furniture';

@Injectable()
export class FurnitureStore extends Store<FurnitureState> {
  constructor() {
      super({
          ...INIT_UI_STATE,

          furnitureList: {
            furnitureStyles: [],
            products: [],
          },
      });
  }

  setFurnitureList(furnitureList: FurnitureList): void {
      this.setState(state => ({...state, furnitureList}));
  }

  setFurnitureProducts(products: Furniture[]): void {
      this.setState(state => ({
        ...state,
        furnitureList: {...state.furnitureList, products}
      }));
  }

}


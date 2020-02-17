import { Injectable } from '@angular/core';
import { Repository } from '@fabelio/core/store/repository';
import { FurnitureState } from './furniture.state';
import { FurnitureStore } from './furniture.store';
import { Observable } from 'rxjs';
import { Furniture } from '../models/furniture';
import { FurnitureList } from '../models/furniture-list';

@Injectable()
export class FurnitureRepository extends Repository<FurnitureState> {

    constructor(store: FurnitureStore) {
        super(store);
    }

    selectFurnitureList$(): Observable<FurnitureList> {
        return this.select(state => state.furnitureList);
    }

    selectFurnitureStyles$(): Observable<string[]> {
        return this.select(state => state.furnitureList.furnitureStyles);
    }

    selectFurnitureProducts$(): Observable<Furniture[]> {
        return this.select(state => state.furnitureList.products);
    }

}

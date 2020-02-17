import { Injectable } from '@angular/core';
import { FabelioApiClient } from '@fabelio/core/api/clients/api.client';
import { Observable } from 'rxjs';
import { FurnitureStore } from '../stores/furniture.store';
import { FurnitureList } from '../models/furniture-list';
import { interactWithUi } from '@fabelio/core/store/operator';
import { mapToClass } from '@fabelio/core/api/transformers/responses.transformer';
import { tap, map } from 'rxjs/operators';
import { Furniture } from '../models/furniture';
import { FURNITURE_PARAMS } from '../stores/furniture.state';

const {NAME, STYLE, DELIVERY} = FURNITURE_PARAMS;

@Injectable()
export class FurnitureService {

    constructor(
        private client: FabelioApiClient,
        private store: FurnitureStore,
    ) {}

    getFurnitureList$(params?: any): Observable<FurnitureList> {
        return interactWithUi(
            this.store,
            this.client.get(`5c9105cb330000112b649af8`).pipe(
                mapToClass(FurnitureList),
                map((furnitureList: FurnitureList) => {
                  this.store.setFurnitureList(furnitureList);
                  return furnitureList.products;
                }),
                tap(products => this.filterFurnitureProducts(products, params)),
            )
        );
    }

    filterFurnitureProducts(products: Furniture[], queries: any) {

      this.store.setLoading(true);

      const names = queries[NAME] || null;
      let styles = queries[STYLE] || [];
      let deliveries = queries[DELIVERY] || [];

      styles = Array.isArray(styles) ? styles : [styles];
      deliveries = Array.isArray(deliveries) ? deliveries : [deliveries];

      const highestTime = deliveries.length > 0 ?
        Math.max.apply(Math, deliveries.map((item: string) => +item)) : 0;

      const filtered = products.filter(item =>
          (!!names ? item.hasIncludeName(names) : true)
          && (styles.length > 0 ? item.hasAnyFurnitureStyles(styles) : true)
          && (highestTime > 0 ? item.hasSuitableDeliveryTime(highestTime) : true)
      );

      console.log(names, styles, highestTime);

      this.store.setFurnitureProducts(filtered);
      this.store.setLoading(false);
    }
}

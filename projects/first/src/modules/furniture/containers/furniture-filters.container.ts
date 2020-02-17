import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FurnitureRepository } from '@fabelio/domains/furniture/stores/furniture.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribers } from '@fabelio/core/store/subscribers';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FURNITURE_PARAMS } from '@fabelio/domains/furniture/stores/furniture.state';
import { DELIVERY_TIMES } from '@fabelio/domains/furniture/models/delivery-times';

const {STYLE, DELIVERY} = FURNITURE_PARAMS;

@Component({
  selector: 'fabelio-furniture-filters-container',
  templateUrl: './furniture-filters.container.html'
})
export class FurnitureFiltersContainer {

  styleControl: FormControl = new FormControl();
  deliveryControl: FormControl = new FormControl();

  deliveryTimes = DELIVERY_TIMES;

  constructor(
    private repository: FurnitureRepository,
    private route: ActivatedRoute,
    private router: Router,
    private subscribers: Subscribers,
  ) {}

  get furnitureStyles$(): Observable<string[]> {
    return this.repository.selectFurnitureStyles$();
  }

  ngOnInit(): void {
    this.subscribers.subscribe(this, this.applyQueryParams$());
    this.subscribers.subscribe(this, this.setQueryParams$(this.styleControl, STYLE));
    this.subscribers.subscribe(this, this.setQueryParams$(this.deliveryControl, DELIVERY));
  }

  ngOnDestroy(): void {
    this.subscribers.flush(this);
  }

  getTimesName(value: string): string {
    const deliveryTime = this.deliveryTimes.find(time => time.value === value);
    return !!deliveryTime ? deliveryTime.name : '';
  }

  applyQueryParams$(): Observable<any> {
    return this.route.queryParams.pipe(
      tap(queries => {
        let styles = queries[STYLE] || [];
        let deliveries = queries[DELIVERY] || [];

        styles = Array.isArray(styles) ? styles : [styles];
        deliveries = Array.isArray(deliveries) ? deliveries : [deliveries];

        this.styleControl.setValue([...styles], { emitEvent: false });
        this.deliveryControl.setValue([...deliveries], { emitEvent: false });
      })
    );
  }

  setQueryParams$(controls: FormControl, key: string): Observable<any> {
    return controls.valueChanges.pipe(
      tap((value: string[] | null) => {
        this.router.navigate([], {
          queryParams: { [key]: value },
          queryParamsHandling: 'merge',
          relativeTo: this.route,
        });
      })
    );
  }

}

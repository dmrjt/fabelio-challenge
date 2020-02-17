import { Component } from '@angular/core';
import { FurnitureRepository } from '@fabelio/domains/furniture/stores/furniture.repository';
import { Observable, combineLatest } from 'rxjs';
import { Furniture } from '@fabelio/domains/furniture/models/furniture';
import { FurnitureService } from '@fabelio/domains/furniture/services/furniture.service';
import { ActivatedRoute } from '@angular/router';
import { Subscribers } from '@fabelio/core/store/subscribers';
import { tap, switchMap } from 'rxjs/operators';
import { FURNITURE_PARAMS } from '@fabelio/domains/furniture/stores/furniture.state';

@Component({
  selector: 'fabelio-furniture-list-container',
  templateUrl: './furniture-list.container.html',
})
export class FurnitureListContainer {

  constructor(
    private repository: FurnitureRepository,
    private service: FurnitureService,
    private route: ActivatedRoute,
    private subscribers: Subscribers,
  ) {}

  get loading$(): Observable<boolean> {
    return this.repository.isLoading$();
  }

  get furnitureProducts$(): Observable<Furniture[]> {
    return this.repository.selectFurnitureProducts$();
  }

  get queries$(): Observable<any> {
    return this.route.queryParams;
  }

  ngOnInit(): void {
    this.subscribers.subscribe(
      this,
      this.queries$.pipe(
        switchMap(queries => this.service.getFurnitureList$(queries))
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscribers.flush(this);
  }

}

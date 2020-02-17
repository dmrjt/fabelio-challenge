import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribers } from '@fabelio/core/store/subscribers';
import { Observable } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FURNITURE_PARAMS } from '@fabelio/domains/furniture/stores/furniture.state';

const { NAME } = FURNITURE_PARAMS;

@Component({
  selector: 'fabelio-furniture-searchbar-container',
  templateUrl: './furniture-searchbar.container.html'
})
export class FurnitureSearchbarContainer {

  nameControl: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subscribers: Subscribers,
  ) {}

  ngOnInit(): void {
    this.subscribers.subscribe(this, this.applyQueryParams$());
    this.subscribers.subscribe(this, this.setNameQueryParams$());
  }

  ngOnDestroy(): void {
    this.subscribers.flush(this);
  }

  applyQueryParams$(): Observable<any> {
    return this.route.queryParams.pipe(
      tap(queries => {
        const names = queries[NAME] || null;

        this.nameControl.setValue(names, { emitEvent: false });
      })
    );
  }

  setNameQueryParams$(): Observable<any> {
    return this.nameControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((value: string) => {
        this.router.navigate([], {
          queryParams: { [NAME]: value === '' ? null : value },
          queryParamsHandling: 'merge',
          relativeTo: this.route,
        });
      })
    );
  }

}

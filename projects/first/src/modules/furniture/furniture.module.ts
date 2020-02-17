import { NgModule } from '@angular/core';
import { FURNITURE_COMPONENTS } from './components';
import { FURNITURE_CONTAINERS } from './containers';
import { FURNITURE_PAGES } from './pages';
import { FurnitureRoutes } from './furniture.routes';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FurnitureDomainModule } from '@fabelio/domains/furniture/furniture.module';
import { LoaderModule } from '@fabelio/shared/loader/loader.module';

const COMMON_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  LoaderModule,
];
const FABELIO_MODULES = [
  FurnitureDomainModule,
];
const OTHER_MODULES = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    ...FABELIO_MODULES,
    ...OTHER_MODULES,
    FurnitureRoutes,
  ],
  declarations: [
    ...FURNITURE_COMPONENTS,
    ...FURNITURE_CONTAINERS,
    ...FURNITURE_PAGES,
  ],
  exports: [
    ...FURNITURE_COMPONENTS,
    ...FURNITURE_CONTAINERS,
  ],
})
export class FurnitureViewModule {}

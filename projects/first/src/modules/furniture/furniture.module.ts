import { NgModule } from '@angular/core';
import { FURNITURE_COMPONENTS } from './components';
import { FURNITURE_CONTAINERS } from './containers';
import { FURNITURE_PAGES } from './pages';
import { FurnitureRoutes } from './furniture.routes';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

const COMMON_MODULES = [CommonModule];
const FABELIO_MODULES = [];
const OTHER_MODULES = [MatToolbarModule];

@NgModule({
  imports: [...COMMON_MODULES, ...FABELIO_MODULES, ...OTHER_MODULES, FurnitureRoutes],
  declarations: [...FURNITURE_COMPONENTS, ...FURNITURE_CONTAINERS, ...FURNITURE_PAGES],
  exports: [...FURNITURE_COMPONENTS, ...FURNITURE_CONTAINERS],
})
export class FurnitureViewModule {}

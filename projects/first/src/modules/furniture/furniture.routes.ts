import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FurnitureListPage } from './pages/furniture-list.page';

const routes: Routes = [
  {
    path: '',
    component: FurnitureListPage,
  }
];

export const FurnitureRoutes: ModuleWithProviders = RouterModule.forChild(routes);

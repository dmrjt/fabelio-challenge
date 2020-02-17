import { NgModule } from '@angular/core';
import { FurnitureService } from './services/furniture.service';
import { FurnitureRepository } from './stores/furniture.repository';
import { FurnitureStore } from './stores/furniture.store';

@NgModule({
  imports: [],
  providers: [
    FurnitureService,
    FurnitureRepository,
    FurnitureStore,
  ],
})
export class FurnitureDomainModule {}

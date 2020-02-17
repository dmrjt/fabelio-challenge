import { UiState } from '@fabelio/core/store/states';
import { FurnitureList } from '../models/furniture-list';

export interface FurnitureState extends UiState {
  furnitureList: FurnitureList;
}

export const FURNITURE_PARAMS = {
  STYLE: 'furnitureStyles',
  DELIVERY: 'deliveries',
  NAME: 'names',
};

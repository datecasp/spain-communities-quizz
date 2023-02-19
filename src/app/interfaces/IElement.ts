import { Coordinate } from 'ol/coordinate';

export interface IElement {
  id: number;
  name: string;
  point: Coordinate;
  isSelected: boolean;
}

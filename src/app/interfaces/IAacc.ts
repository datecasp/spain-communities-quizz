import { Coordinate } from 'ol/coordinate';
import { IElement } from './IElement';

export interface IAacc extends IElement {
    point: Coordinate;
}
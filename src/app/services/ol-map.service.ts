import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { ELEMENT_DATA } from '../data/element-data';
import { IElement } from '../interfaces/IElement';

@Injectable({
  providedIn: 'root',
})
export class OlMapService {
  data = ELEMENT_DATA;

  constructor() {}

  public getDataService(): IElement[] {
    return this.data;
  }

  public getRandomShwedAaccService(): IElement{
    let randomPointId = Math.floor(Math.random() * 17);
    return this.data[randomPointId];
  }

  private getPointsListService(): Coordinate[] {
    let result: Coordinate[] = [];
    for (let i = 0; i < this.data.length; i++) {
      result.push(this.data[i].point);
    }
    return result;
  }
}

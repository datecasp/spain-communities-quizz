import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Pixel } from 'ol/pixel';
import { ELEMENT_DATA } from '../data/element-data';
import { IElement } from '../interfaces/IElement';

@Injectable({
  providedIn: 'root',
})
export class OlMapService {
  data = ELEMENT_DATA;
  showedData: IElement | any;

  constructor() {}

  public getDataService(): IElement[] {
    return this.data;
  }

  public getRandomShowedAaccService(): IElement {
    this.showedData = this.data[Math.floor(Math.random() * 17)];
    return this.showedData;
  }

  public checkClickedAaccService(pixel: Pixel): boolean {
    return pixel == (this.showedData.point as Pixel);
  }
}

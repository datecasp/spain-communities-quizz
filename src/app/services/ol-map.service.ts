import { Injectable } from '@angular/core';
import { Pixel } from 'ol/pixel';
import { ELEMENT_DATA } from '../data/element-data';
import { IAacc } from '../interfaces/IAacc';

@Injectable({
  providedIn: 'root',
})
export class OlMapService {
  data = ELEMENT_DATA;
  showedData: IAacc | any;

  constructor() {}

  public getDataService(): IAacc[] {
    return this.data;
  }

  public getRandomShowedAaccService(): IAacc {
    this.showedData = this.data[Math.floor(Math.random() * 17)];
    return this.showedData;
  }

  public checkClickedAaccService(pixel: Pixel): boolean {
    return pixel == (this.showedData.point as Pixel);
  }
}

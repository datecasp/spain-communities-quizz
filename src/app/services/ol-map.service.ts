import { Injectable } from '@angular/core';
import { Pixel } from 'ol/pixel';
import { ELEMENT_DATA } from '../data/element-data';
import { IAacc } from '../interfaces/IAacc';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';

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

  public updateMap(aacc: IAacc): VectorSource {
    let point = new Point(aacc.point);
    var featurething = new Feature({
      name: 'aaccPoint',
      geometry: point
    });
    let vectorSource = new VectorSource();
    vectorSource.addFeature(featurething);
    return vectorSource;
  }
}

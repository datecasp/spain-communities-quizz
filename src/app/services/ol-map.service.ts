import { Injectable } from '@angular/core';
import { Pixel } from 'ol/pixel';
import { ELEMENT_DATA } from '../data/element-data';
import { IAacc } from '../interfaces/IAacc';
import Map from 'ol/Map';
import Vector from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

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

  public addLayerToMap(): VectorSource<Point> {
    var showedData = this.getRandomShowedAaccService();

    var point = new Point(showedData.point);

    var featurePoint = new Feature({
      name: 'aaccPoint',
      geometry: point,
    });

    var source = new VectorSource({
      features: [new Feature(point)],
    });

    return source;
  }

  public addLayerToMapF(): Feature {
    var showedData = this.getRandomShowedAaccService();

    var point = new Point(showedData.point);

    var featurePoint = new Feature({
      name: 'aaccPoint',
      geometry: point,
    });

    var source = new VectorSource({
      features: [new Feature(point)],
    });

    return new Feature(point);
  }
}

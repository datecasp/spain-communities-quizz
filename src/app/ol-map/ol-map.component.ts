import {
  Component,
  NgZone,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
//import { View, Feature, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import { getCenter } from 'ol/extent';
import VectorSource from 'ol/source/Vector';
import { defaults as DefaultControls } from 'ol/control';
import { Point } from 'ol/geom';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { Pixel } from 'ol/pixel';
import { EduGamingControl } from '../controls/edu-gaming-control';
import Feature from 'ol/Feature';
import View from 'ol/View';
import Map from 'ol/Map';
import { useGeographic } from 'ol/proj';
import { ELEMENT_DATA } from '../data/element-data';
import { IElement } from '../interfaces/IElement';

useGeographic();

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css'],
})
export class OlMapComponent implements AfterViewInit {
  @Input() center: Coordinate | any; // map center
  @Input() zoom: number | any; // initial zoom
  points: Coordinate[] | any; // Point
  mapPoint: Point | any;
  mapCoord: Coordinate | any;
  feat: Feature | any;
  view: View | any;
  map: Map | any;

  //Data and defs for column buttons
  data = ELEMENT_DATA;
  dataSourceLeft: IElement[] = ELEMENT_DATA.slice(
    0,
    ELEMENT_DATA.length / 2 + 1
  );
  dataSourceRight: IElement[] = ELEMENT_DATA.slice(ELEMENT_DATA.length / 2 + 1);
  columnStyleLeft = 'position: absolute; left:220px; top:150px; zIndex: 10;';
  columnStyleRight = 'position: absolute; right:120px; top:150px; zIndex: 10;';
  @Output() mapReady = new EventEmitter<Map>();

  // Map views always need a projection.  Here we just want to map image
  // coordinates directly to map coordinates, so we create a projection that uses
  // the image extent in pixels.
  readonly extent = [0, 0, 800, 700];
  readonly projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });

  randomPointId: number = -1;

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.points = this.getPointsList(this.data);
    this.randomPointId = Math.floor(Math.random() * 17);
    this.mapPoint = new Point(this.points[this.randomPointId]);
   
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));
  }

  private getPointsList(data: IElement[]): Coordinate[] {
    let result: Coordinate[] = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i].point);
    }
    return result;
  }

  private initMap(): void {
   this.view = new View({
      center: this.center,
      zoom: this.zoom,
      projection: this.projection,
    });

    this.map = new Map({
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([new EduGamingControl({})]),
      layers: [
        new ImageLayer({
          source: new Static({
            url: './assets/spain-aacc.png',
            projection: this.projection,
            imageExtent: this.extent,
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(this.mapPoint)],
          }),
          style: {
            'circle-radius': 9,
            'circle-fill-color': 'blue',
          },
        }),
      ],
    });
  }

  onClick($event: any) {
    let pixel: Pixel = [$event.x, $event.y];
    const feature = this.map.getFeaturesAtPixel(pixel)[0] as Feature;
    if (!feature) {
      return;
    }
    console.log(feature.getId());
    const coordinate = feature.getGeometry() as Point;
    console.log(coordinate.getCoordinates(), feature);
  }

  onPointerMove($event: any) {
    let pixel: Coordinate = [$event.x, $event.y];
    const type = this.map.hasFeatureAtPixel(pixel) ? 'pointer' : 'inherit';
    this.map.getViewport().style.cursor = type;
  }
}

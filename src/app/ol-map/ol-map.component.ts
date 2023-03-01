import {
  Component,
  NgZone,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
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
import { OlMapService } from '../services/ol-map.service';
import { IAacc } from '../interfaces/IAacc';
import { InlineStyles } from '../Resources/inline-styles';
import Vector from 'ol/source/Vector';
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
  inlineStyleStore: InlineStyles = new InlineStyles();
  playAgain = false;
  //Data and defs for column buttons
  data = this._olMapService.getDataService();
  dataSourceLeft: IAacc[] = this.data.slice(0, this.data.length / 2 + 1);
  dataSourceRight: IAacc[] = this.data.slice(this.data.length / 2 + 1);
  columnStyleLeft = this.inlineStyleStore.columnStyleLeft;
  columnStyleRight = this.inlineStyleStore.columnStyleRight;
  stylePlayAgainBtn = this.inlineStyleStore.stylePlayAgainBtn;
  @Output() mapReady = new EventEmitter<Map>();
  tries: number = 1;
  vectorSource = new Vector({});

  // Map views always need a projection.  Here we just want to map image
  // coordinates directly to map coordinates, so we create a projection that uses
  // the image extent in pixels.
  readonly extent = [0, 0, 800, 700];
  readonly projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });

  //Instance of the AACC showed in quizz
  showedData: IAacc = this._olMapService.getRandomShowedAaccService();
  randomPointId: number = -1;

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private _olMapService: OlMapService
  ) {}

  ngAfterViewInit(): void {
    //this.mapPoint = new Point(this.showedData.point);
    this.vectorSource = this._olMapService.updateMap(this.showedData);
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));
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
          source: this.vectorSource,
          style: {
            'circle-radius': 9,
            'circle-fill-color': 'blue',
          },
        }),
      ],
    });
  }

  onClick($event: any) {
    //Try  to render the map with the new Point
    //Not working ATM
    this.tries = 1;
    this.showedData = this._olMapService.getRandomShowedAaccService();
    //this.mapPoint = new Point(this.showedData.point);
    this.vectorSource = this.map._olMapService.updateMap(this.showedData);
    this.initMap();
    this.map.render();
    this.ngAfterViewInit();
    // Not needed for this game
    // let pixel: Pixel = [$event.x, $event.y];
    // const feature = this.map.getFeaturesAtPixel(pixel)[0] as Feature;
    // if (!feature) {
    //   return;
    // }
    // console.log(feature.getId());
    // const coordinate = feature.getGeometry() as Point;
    // console.log(coordinate.getCoordinates(), feature);
  }

  buttonClicked() {
    this.tries++;
  }

  onPointerMove($event: any) {
    //Not needed fot this game
    // let pixel: Coordinate = [$event.x, $event.y];
    // const type = this.map.hasFeatureAtPixel(pixel) ? 'pointer' : 'inherit';
    // this.map.getViewport().style.cursor = type;
  }
}

import { Component } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { ELEMENT_DATA } from './data/element-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spain-communities-quizz'; 
  //Inputs app-ol-map and in-line style defs
  center: Coordinate = [200, 350];
  zoom: number = 1.2;
  mapStyle = 'width: 1200px; height: 700px;';

  //Inputs table-custom and in-line style defs
  dataA = ELEMENT_DATA.slice(0, ELEMENT_DATA.length / 2 + 1);
  dataB = ELEMENT_DATA.slice(ELEMENT_DATA.length / 2 + 1);
  btnStyle =
    'minWidth: 150px; height: 2.5em; fontSize: larger; margin: 1%;';
  colorNotSelected = 'aquamarine';
  colorSelected = "blue";
  index = -1;

  constructor() {}
}

import { Component, Input, ViewChild } from '@angular/core';
import { IElement } from '../interfaces/IElement';
import { OlMapService } from '../services/ol-map.service';

/**
 *  TODO:
 *  Implement CDK/Collections SelectionModel
 *  to persists wich buttons were clicked by user
 *  https://material.angular.io/cdk/collections/overview
 */
@Component({
  selector: 'table-custom',
  styleUrls: ['./table-custom.component.css'],
  templateUrl: './table-custom.component.html',
})
export class TableCustomComponent {
  @Input() data: IElement[] = [];
  @Input() columnStyle: string = '';
  dataSource: IElement[] = [];
  displayedColumns = ['name'];
  correctAnswer: boolean = false;
  notSelectedColor = 'aquamarine';
  correctColor = 'green';
  wrongColor = 'red';
  border: number = 0;

  constructor(private _olMapService: OlMapService) {}

  ngAfterViewInit() {
    console.log(this.data[5].name);
    this.dataSource = this.data;
  }

  onClick(element: IElement) {
    //  To equals id and dataSource index if dataSource[0].id != 0
    //  dataA[0].id == 1   dataB[0] == 10 in spain-aacc-quizz
    let offsetId = this.dataSource[0].id;
    this.correctAnswer = this._olMapService.checkClickedAaccService(
      element.point
    );
    this.dataSource[element.id - offsetId].isSelected = !element.isSelected;
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

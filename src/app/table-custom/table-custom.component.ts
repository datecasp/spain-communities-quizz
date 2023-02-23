import { Component, Input, ViewChild } from '@angular/core';
import { IAacc } from '../interfaces/IAacc';
import { FinalDialogService } from '../services/final-dialog.service';
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
  @Input() data: IAacc[] = [];
  @Input() columnStyle: string = '';
  dataSource: IAacc[] = [];
  displayedColumns = ['name'];
  correctAnswer: boolean = false;
  notSelectedColor = 'aquamarine';
  correctColor = 'green';
  wrongColor = 'red';
  border: number = 0;

  constructor(private _olMapService: OlMapService, private _finalDialogService: FinalDialogService) {}

  ngAfterViewInit() {
    console.log(this.data[5].name);
    this.dataSource = this.data;
  }

  onClick(element: IAacc) {
    //  To equals id and dataSource index if dataSource[0].id != 0
    //  dataA[0].id == 1   dataB[0] == 10 in spain-aacc-quizz
    let offsetId = this.dataSource[0].id;
    element.isCorrect = this._olMapService.checkClickedAaccService(
      element.point
    );
    this.dataSource[element.id - offsetId].isSelected = !element.isSelected;
    if(element.isCorrect){
      this._finalDialogService.confirm(element.isCorrect, 'Yeah Right!!! Nice answer!',
      'That´s the correct ', "answer");
    }
  }

  onLeave(element: IAacc) {
    let offsetId = this.dataSource[0].id;
    if (!this.dataSource[element.id - offsetId].isCorrect){
      this.dataSource[element.id - offsetId].isSelected = !element.isSelected;
    }
  }
}

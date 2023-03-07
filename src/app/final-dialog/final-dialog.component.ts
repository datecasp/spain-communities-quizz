import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAacc } from '../interfaces/IAacc';
import { FinalDialogService } from '../services/final-dialog.service';

@Component({
  selector: 'app-final-dialog',
  templateUrl: './final-dialog.component.html',
  styleUrls: ['./final-dialog.component.css'],
})
export class FinalDialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() triesTxt: string = '';
  @Input() triesNum: number = 0;
  @Input() btnOkText: string = '';
  @Input() btnElement: IAacc | any;

  constructor(
    private activeModal: NgbActiveModal,
    private _finalDialogService: FinalDialogService
  ) {}

  ngOnInit(): void {}

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(false);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}

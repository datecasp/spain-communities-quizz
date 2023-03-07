import { EventEmitter, Injectable, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinalDialogComponent } from '../final-dialog/final-dialog.component';
import { IAacc } from '../interfaces/IAacc';

@Injectable()
export class FinalDialogService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    triesTxt: string,
    triesNum: number,
    btnElement: IAacc,
    btnOkText: string = 'Close',
    dialogSize: 'sm' | 'lg' = 'lg'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(FinalDialogComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.triesTxt = triesTxt;
    modalRef.componentInstance.triesNum = triesNum;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnElement = btnElement;

    return modalRef.result;
  }

  public uncheckButton(btnElement: IAacc) {
    
  }
}

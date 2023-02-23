import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinalDialogComponent } from '../final-dialog/final-dialog.component';

@Injectable()
export class FinalDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    triesTxt: string,
    triesNum: number,
    btnOkText: string = 'Play again!',
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(FinalDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.triesTxt = triesTxt;
    modalRef.componentInstance.triesNum = triesNum
    modalRef.componentInstance.btnOkText = btnOkText;

    return modalRef.result;
  }
}
import { Component, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-final-dialog',
  templateUrl: './final-dialog.component.html',
  styleUrls: ['./final-dialog.component.css']
})
export class FinalDialogComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() triesTxt: string = "";
  @Input() triesNum: number = 0;
  @Input() btnOkText: string = "";

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
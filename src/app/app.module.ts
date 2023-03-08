import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableCustomComponent } from './table-custom/table-custom.component';
import { OlMapComponent } from './ol-map/ol-map.component';
import { OlMapService } from './services/ol-map.service';
import { FinalDialogComponent } from './final-dialog/final-dialog.component';
import { FinalDialogService } from './services/final-dialog.service';

@NgModule({
  declarations: [AppComponent, TableCustomComponent, OlMapComponent, FinalDialogComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
  ],
  providers: [OlMapService, FinalDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
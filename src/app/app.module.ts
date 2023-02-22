import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableCustomComponent } from './table-custom/table-custom.component';
import { OlMapComponent } from './ol-map/ol-map.component';
import { OlMapService } from './services/ol-map.service';

@NgModule({
  declarations: [AppComponent, TableCustomComponent, OlMapComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
  ],
  providers: [OlMapService],
  bootstrap: [AppComponent],
})
export class AppModule {}

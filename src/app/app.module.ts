import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAppComponent } from './component/explorer/list-app/list-app.component';
import { CrudAppComponent } from './component/crud-app/crud-app.component';
import { EnvSelectorComponent } from './component/env-selector/env-selector.component';
import { ExplorerComponent } from './component/explorer/explorer.component';
import { ListGroupComponent } from './component/explorer/list-group/list-group.component';
import { OneAppComponent } from './component/explorer/list-app/one-app/one-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from './services/cookie.service';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    CrudAppComponent,
    EnvSelectorComponent,
    ListAppComponent,
    OneAppComponent,
    ListGroupComponent,
    ExplorerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Component
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

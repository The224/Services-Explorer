import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSelectorComponent } from './component/app-selector/app-selector.component';
import { ListAppComponent } from './component/app-selector/list-app/list-app.component';
import { ListGroupComponent } from './component/app-selector/list-group/list-group.component';
import { OneAppComponent } from './component/app-selector/one-app/one-app.component';
import { ContainerComponent } from './container/container.component';
import { CrudAppComponent } from './crud-app/crud-app.component';
import { EnvSelectorComponent } from './env-selector/env-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    CrudAppComponent,
    EnvSelectorComponent,
    ListAppComponent,
    OneAppComponent,
    ListGroupComponent,
    AppSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

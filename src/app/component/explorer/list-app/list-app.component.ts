import { Component, OnInit } from '@angular/core';
import { ApplicationService, Application } from 'src/app/services/application.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-app',
  templateUrl: './list-app.component.html',
  styleUrls: ['./list-app.component.scss']
})
export class ListAppComponent implements OnInit {

  public apps: Application[];

  constructor(private appService: ApplicationService) { }

  ngOnInit() {
    this.appService.getSelectedGroup().pipe(
      switchMap(group => this.appService.getByGroup(group))
    ).subscribe(apps => {
      this.apps = apps;
      console.log(this.apps);
    });
  }

}

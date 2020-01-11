import { Component, OnInit, Input } from '@angular/core';
import { Application, ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-one-app',
  templateUrl: './one-app.component.html',
  styleUrls: ['./one-app.component.scss']
})
export class OneAppComponent implements OnInit {

  @Input() public app: Application;

  public currentEnv: string = null;
  public linkEnabled: boolean = false;

  constructor(private appService: ApplicationService) { }

  ngOnInit() {
    this.appService.getSelectedEnv().subscribe(env => {
      this.currentEnv = env;
      // TODO Check if there is urls
      if (this.app.urls /*in this.currentEnv*/) {
        this.linkEnabled = true;
      } else if (this.app.no_env_url) {
        this.linkEnabled = true;
      } else {
        this.linkEnabled = false;
      }
    });
  }

  public openLink() {
    const test = [];
    // TODO Check if there is urls
    if (this.app.urls) {

    } else if (this.app.no_env_url) {

    }

  }

}

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
  public link: string = null;

  constructor(private appService: ApplicationService) { }

  ngOnInit() {
    this.appService.getSelectedEnv().subscribe(env => {
      this.currentEnv = env;
      if (this.app.urls) {
        let changed = false;
        for (const key in this.app.urls) {
          if (key === this.currentEnv) {
            this.link = `${this.app.urls[key]}`;
            changed = true;
          }
        }
        if (!changed) {
          this.link = null;
        }
      } else if (this.app.no_env_url) {
        this.link = `${this.app.no_env_url}`;
      } else {
        this.link = null;
      }
    });
  }

}

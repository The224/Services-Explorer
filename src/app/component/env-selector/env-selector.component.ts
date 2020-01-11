import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-env-selector',
  templateUrl: './env-selector.component.html',
  styleUrls: ['./env-selector.component.scss']
})
export class EnvSelectorComponent implements OnInit {

  public envs: string[] = []
  public selectedEnv: string = ""

  constructor(private appService: ApplicationService) { }

  public ngOnInit() {
    this.appService.getEnvs().subscribe(envs => this.envs = envs);
    this.appService.getSelectedEnv().pipe(debounceTime(100)).subscribe(env => this.selectedEnv = env);
  }

  public onSelect(env: string) {
    this.appService.setSelectedEnv(env);
  }

}

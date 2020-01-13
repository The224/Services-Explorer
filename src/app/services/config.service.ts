import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Application, ApplicationService } from './application.service';

export interface Config {
  title: string;
  services: Application[],
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: BehaviorSubject<Config> = new BehaviorSubject(null)

  constructor(private appService: ApplicationService) {
    this.config.pipe(filter(Boolean)).subscribe((config: Config) => this.appService.reload(config.services));
  }

  public loadConfig(config: Config) {
    this.config.next(config);
  }

  public exportConfig() {
    const currentConfig = this.config.getValue()
    const configAsString = JSON.stringify(currentConfig, undefined, 2);
    const element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(configAsString));
    element.setAttribute('download', "service-explorer-config.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

}

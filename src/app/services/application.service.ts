import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/observable/';


export interface Application {
  name: string;
  description: string;
  group: string;
  repo_link: string;
  urls: { [env: string]: string };
  no_env_url: string;
  dependencies: string[];
}


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public applicationObservable: BehaviorSubject<Application[]> = new BehaviorSubject([]);

  constructor() {
    const testApp: Application = {
      name: "",
      description: "",
      group: "",
      repo_link: "",
      urls: { "dev": "", },
      no_env_url: "",
      dependencies: [],
    }
    this.applicationObservable.next([testApp])
  }

  public reload(apps: Application[]) {
    this.applicationObservable.next(apps)
  }

  public get_groups() {

  }

  public get_apps_by_group(groupName: string) {
    this.applicationObservable.pipe(filter)
  }


}

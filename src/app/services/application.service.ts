import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      dependencies: ["", ""],
    }
    this.applicationObservable.next([testApp])
  }

  public reload(apps: Application[]) {
    this.applicationObservable.next(apps)
  }

  public get_groups(): Observable<string[]> {
    return this.applicationObservable.pipe(map(apps => Array.from(new Set(apps.map(app => app.group)))))
  }

  public get_by_group(groupName: string): Observable<Application[]> {
    return this.applicationObservable.pipe(map(apps => apps.filter(app => app.group === groupName)))
  }

  public add(app: Application) {
    this.applicationObservable.pipe(map(apps => {
      apps.push(app);
      this.applicationObservable.next(apps);
    }))
  }

  public remove(appName: string) {
    this.applicationObservable.pipe(map(apps => {
      apps = apps.filter(app => app.name !== appName);
      this.applicationObservable.next(apps);
    }))
  }

  public update(app: Application) {
    this.remove(app.name)
    this.add(app)
  }

}

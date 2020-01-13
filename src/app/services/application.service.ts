import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Application {
  name: string;
  description: string;
  group: string;
  repo_link: string;
  doc_link: string;
  website_link: string;
  urls: { [env: string]: string };
  no_env_url: string;
  dependencies: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationObservable: BehaviorSubject<Application[]> = new BehaviorSubject([]);
  private selectedGroupObservable: BehaviorSubject<string> = new BehaviorSubject("Development");
  private selectedEnvObservable: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }

  public reload(apps: Application[]) {
    this.applicationObservable.next(apps)
  }

  public getSelectedEnv(): Observable<string> {
    return this.selectedEnvObservable.asObservable()
  }

  public setSelectedEnv(env: string) {
    this.selectedEnvObservable.next(env)
  }

  public getSelectedGroup(): Observable<string> {
    return this.selectedGroupObservable.asObservable()
  }

  public setSelectedGroup(group: string) {
    this.selectedGroupObservable.next(group)
  }

  public getEnvs(): Observable<string[]> {
    return this.applicationObservable.pipe(map(apps => {
      const envs: string[] = []
      apps.forEach(app => {
        for (const key in app.urls) {
          if (envs.indexOf(key) === -1) {
            envs.push(key)
          }
        }
      });
      return envs;
    }));
  }

  public getGroups(): Observable<string[]> {
    return this.applicationObservable.pipe(map(apps => Array.from(new Set(apps.map(app => app.group)))))
  }

  public getByGroup(groupName: string): Observable<Application[]> {
    return this.applicationObservable.pipe(map(apps => apps.filter(app => app.group.toLocaleLowerCase() === groupName.toLocaleLowerCase())))
  }

  public getAll(): Observable<Application[]> {
    return this.applicationObservable.asObservable()
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

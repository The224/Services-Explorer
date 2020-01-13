import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from './application.service';
import { ConfigService } from './config.service';

export const WE_USE_COOKIE_MESSAGE = 'We use cookie to save state between session.';
export const ACKNOWLEDGE_COOKIE = 'acknowledge_cookie';
export const CLIENT_CONFIG = 'client_config';
export const SELECTED_GROUP = 'selected_group';
export const SELECTED_ENV = 'selected_env';
export const SELECTED_THEME = 'selected_theme';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  // FIXME, rename. Not using cookie anymore

  constructor(private configService: ConfigService, private appService: ApplicationService, private snackBar: MatSnackBar) { }

  init() {
    this.setPreviousValues();
    this.subscribeToNewValues();
  }

  setPreviousValues() {
    // acknowledge
    const has_acknowledge_cookie = this.getCookie(ACKNOWLEDGE_COOKIE);
    if (!has_acknowledge_cookie) {
      this.openAcknowledgeBar();
    }
    // config
    const client_config = localStorage.getItem(CLIENT_CONFIG)
    if (client_config) {
      this.configService.loadConfig(JSON.parse(client_config))
    }
    // group
    const selected_group = localStorage.getItem(SELECTED_GROUP);
    if (selected_group) {
      this.appService.setSelectedGroup(selected_group);
    }
    // env
    const selected_env = localStorage.getItem(SELECTED_ENV);
    if (selected_env) {
      this.appService.setSelectedEnv(selected_env);
    }
    // theme
    const theme = this.getCookie(SELECTED_THEME);
    // TODO
  }

  subscribeToNewValues() {
    this.appService.getSelectedEnv().subscribe(env => localStorage.setItem(SELECTED_ENV, env));
    this.appService.getSelectedGroup().subscribe(group => localStorage.setItem(SELECTED_GROUP, group));
    this.configService.config.subscribe(config => localStorage.setItem(CLIENT_CONFIG, JSON.stringify(config)));
  }

  public getCookie(name: string): string {
    let value: string;
    document.cookie.replace(/\s/g, '').split(';').forEach(cookie => {
      const co = cookie.split('=');
      console.log(co);
      if (co[0] === name) { value = co[1]; }
    });
    return value;
  }

  public setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }

  public clearAll() {
    document.cookie = CLIENT_CONFIG + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = SELECTED_GROUP + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = SELECTED_ENV + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = SELECTED_THEME + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.clear()
  }

  public openAcknowledgeBar() {
    this.snackBar.open(WE_USE_COOKIE_MESSAGE, "I understand", {
      duration: 0,
      panelClass: "cookie_bar"
    }).afterDismissed().subscribe(() => {
      this.setCookie(ACKNOWLEDGE_COOKIE, "true")
    });
  }

}

import { Injectable } from '@angular/core';
import { ApplicationService } from './application.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private appService: ApplicationService, private snackBar: MatSnackBar) { }

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
    // TODO config
    const client_config = this.getCookie(CLIENT_CONFIG);
    if (client_config) {
    }
    // group
    const selected_group = this.getCookie(SELECTED_GROUP);
    if (selected_group) {
      this.appService.setSelectedGroup(selected_group);
    }
    // env
    const selected_env = this.getCookie(SELECTED_ENV);
    if (selected_env) {
      this.appService.setSelectedEnv(selected_env);
    }
    // theme
    const theme = this.getCookie(SELECTED_THEME);
    // TODO
  }

  subscribeToNewValues() {
    this.appService.getSelectedEnv().subscribe(env => this.setCookie(SELECTED_ENV, env));
    this.appService.getSelectedGroup().subscribe(group => this.setCookie(SELECTED_GROUP, group));
  }

  public getCookie(name: string): string {
    let value: string;
    document.cookie.replace(/\s/g, '').split(';').forEach(cookie => {
      const co = cookie.split('=');
      if (co[0] === name) { value = co[1]; }
    });
    return value;
  }

  public setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
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

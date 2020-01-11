import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-app',
  templateUrl: './crud-app.component.html',
  styleUrls: ['./crud-app.component.scss']
})
export class CrudAppComponent implements OnInit {

  public display: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}

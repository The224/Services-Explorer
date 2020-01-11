import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {

  public groups: string[] = [];

  constructor(private appService: ApplicationService) { }

  ngOnInit() {
    this.appService.get_groups().subscribe(groups => {
      this.groups = groups;
      console.log(this.groups);
    })
  }

  public changeGroup(group: string) {
    this.appService.set_selected_group(group)
  }

}

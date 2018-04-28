import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {
  public showSidenav = false;
  @ViewChild(MatDrawer) expander: MatDrawer;
  constructor() { }

  ngOnInit() {
    this.expander.opened = this.showSidenav;
    this.expander.openedChange.subscribe(() => {
      this.showSidenav = this.expander.opened;
    });
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  forRetractedSideBar: boolean;
  forExpandedContent: boolean;
  constructor() {}

  ngOnInit() {
    this.forRetractedSideBar = true;
  }

  /**
   * Information qui vient de l'event emitter du component child.
   * Il doit remonter l'info que le sidebar est retracted ou expanded
   * @param info: boolean
   */
  onInfoRetracted(info: boolean) {
    this.forExpandedContent = info;
    return info;
  }
}

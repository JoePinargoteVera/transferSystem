import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sidebarOpen = false;
  collapsed = false;
  constructor(private appComponent: AppComponent){
    this.appComponent.showNavbar = false;
  }

  

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}

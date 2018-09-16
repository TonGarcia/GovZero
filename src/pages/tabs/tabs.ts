import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { PoliticiansPage } from '../politicians/politicians';
import { ProjectsPage } from '../projects/projects';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // Candidate numbers
  tab1Root = PoliticiansPage;
  // List of Projects
  tab2Root = ProjectsPage;
  // About the initiative
  tab3Root = AboutPage;

  constructor() {

  }
}

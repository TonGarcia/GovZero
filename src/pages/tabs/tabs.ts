import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { PoliticiansPage } from '../politicians/politicians';
import { ProjectsPage } from '../projects/projects';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // Candidate numbers
  PoliticiansTab = PoliticiansPage;
  // List of Projects
  ProjectsTab = ProjectsPage;
  // About the initiative
  AboutTab = AboutPage;

  constructor() {

  }
}

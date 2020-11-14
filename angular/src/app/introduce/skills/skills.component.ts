import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skill[];

  constructor() { }

  ngOnInit(): void {
    this.skills = [
      { name: 'HTML5', imgSrc: 'assets/images/skill/html5.png' },
      { name: 'CSS3', imgSrc: 'assets/images/skill/css3.png' },
      { name: 'BOOTSTRAP 4', imgSrc: 'assets/images/skill/bootstrap4.png' },
      { name: 'JAVASCRIPT', imgSrc: 'assets/images/skill/js.png' },
      { name: 'ANGULAR', imgSrc: 'assets/images/skill/angular.svg' },
      { name: 'TYPESCRIPT', imgSrc: 'assets/images/skill/ts.png' },
      { name: 'NODEJS', imgSrc: 'assets/images/skill/nodejs.png' },
      { name: 'MONGODB', imgSrc: 'assets/images/skill/mongodb.png' }
    ];
  }

}

export interface Skill {
  name: string;
  imgSrc: string;
}


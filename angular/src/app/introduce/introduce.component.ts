import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './introduce.route.animation';

@Component({
    selector: 'app-introduce',
    templateUrl: './introduce.component.html',
    styleUrls: ['./introduce.component.css'],
    animations: [slideInAnimation]
})

export class IntroduceComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

}



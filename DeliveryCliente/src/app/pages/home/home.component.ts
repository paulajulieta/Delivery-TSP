import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images:Array<string>;
  constructor(config: NgbCarouselConfig) {
    config.showNavigationIndicators = true;
    config.showNavigationArrows=false;
   }

  ngOnInit(): void {
    this.images=["./assets/images/pizza-clasica.png", "./assets/images/hamburguesa1.png", "./assets/images/empanadas.jpg"];
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images:Array<string>;
  constructor() { }

  ngOnInit(): void {
    this.images=["./assets/images/pizza-clasica.png", "./assets/images/hamburguesa1.png", "./assets/images/empanadas.jpg"];
  }

}

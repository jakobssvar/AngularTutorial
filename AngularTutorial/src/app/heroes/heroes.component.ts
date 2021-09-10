import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: "Jakob",
    description: "the king of kings"
  };

  constructor() { }

  changeName(): void {
    this.hero.name = "Jakob";

  }

  

  ngOnInit(): void {
  }
  ngOnChange(): void {

  }

  ngOnDestroy(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HEROES } from '../mock-heroes';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit {

  public static expLimits:number[] = [50,200,300,450, 600, 800, 1200,1400,1700,2000,2500,3000,4000,5000,6000,8000,10000,13000,16000,20000]
  heroes = HEROES;
  selectedHero?: Hero;
  selectedHero2?: Hero;

  constructor() { }
  ngOnInit(): void {
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;

  }
  onSelect2(hero: Hero): void {
    this.selectedHero2 = hero;

  }

  startFight(hero: Hero, hero2: Hero) {
    while (hero.hp > 0 && hero2.hp > 0) {
      if (hero.spd > hero2.spd) {
        this.attack(hero, hero2);
        this.attack(hero2, hero);
      } else {
        this.attack(hero2, hero);
        this.attack(hero, hero2);
      }
    }
    if (hero.hp == 0) {
      this.giveExp(hero2, hero, 50);
    }
    else {
      this.giveExp(hero, hero2,50);
    }
    //hero2.hp = hero2.maxHp;
    //hero.hp = hero.maxHp;
  }
  attack(hero: Hero, hero2: Hero) {

    let pow: number = (hero.str - hero2.def);
    if (pow > 0) {
      hero2.hp -= pow;
    } else {
      hero2.hp -= 1;
    }
    if (hero2.hp < 0) {
      hero2.hp = 0;
    }

  }
  giveExp(hero: Hero, hero2: Hero, exp: number) {
    let limit = HeroesComponent.expLimits[hero.lvl - 1];
    exp += 25 * hero2.lvl * (hero2.lvl - hero.lvl);
    while (exp > 0) {
      if (hero.lvl < HeroesComponent.expLimits.length && hero.exp + exp >= HeroesComponent.expLimits[hero.lvl - 1]) {
        hero.exp -= HeroesComponent.expLimits[hero.lvl - 1];
        hero.lvl++;
        hero.def += hero.def / 5;
        hero.maxHp += hero.maxHp / 2;
        hero.hp = hero.maxHp;
        hero.spd += 2;
        hero.str += hero.str / 5;
        limit = HeroesComponent.expLimits[hero.lvl - 1];
      }
      hero.exp += exp;
      exp -= limit;
    }
  }
}




import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit {
  private messageService: MessageService;
  public static expLimits: number[] = [50, 200, 300, 450, 600, 800, 1200, 1400, 1700, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 13000, 16000, 20000]
  heroes: Hero[] = [];
  selectedHero?: Hero;
  selectedHero2?: Hero;

  constructor(private heroService: HeroService, messageService: MessageService) {
    this.messageService = messageService;
  }
  ngOnInit(): void {
    //this.messageService = this.heroService.messageService;
     
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;

  }
  onSelect2(hero: Hero): void {
    this.selectedHero2 = hero;

  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  startFight(hero: Hero, hero2: Hero) {
    if (hero.hp == 0 || hero2.hp == 0) { return; }
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
        this.messageService.add(hero.name + " has been defeated.");

      this.giveExp(hero2, hero, 50);
    }
    else {

        this.messageService.add(hero2.name + " has been defeated.");

      this.giveExp(hero, hero2, 50);
    }
    hero.numberOfFights++;
    hero2.numberOfFights++;
    if (hero2.numberOfFights % 2 == 0) {
      hero2.hp = hero2.maxHp;
        this.messageService.add(hero2.name + " was healed.");

    }
    if (hero.numberOfFights % 2 == 0) {
      hero.hp = hero.maxHp;
        this.messageService.add(hero.name + " was healed.");
    }
    
  }
  attack(hero: Hero, hero2: Hero) {

    let pow: number = (hero.str - hero2.def);
    pow = this.getRandomInt(pow, pow * 2);
    if (pow > 1) {
      hero2.hp -= pow;

        this.messageService.add(hero2.name + " Takes " + pow + " dmg from " + hero.name + "s attack.");

    } else {
      hero2.hp -= 1;

        this.messageService.add(hero2.name + " Takes 1 dmg from " + hero.name + "s attack.");

  }
  if(hero2.hp < 0) {
    hero2.hp = 0;
}

  }
giveExp(hero: Hero, hero2: Hero, exp: number) {
  let limit = HeroesComponent.expLimits[hero.lvl - 1];
  exp += 25 * hero2.lvl * (hero2.lvl - hero.lvl);

    this.messageService.add(hero.name + " has recieved "+ exp+"exp.");

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

        this.messageService.add(hero.name + " has leveled up!");

    }
    hero.exp += exp;
    exp -= limit;
  }
}
getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
}




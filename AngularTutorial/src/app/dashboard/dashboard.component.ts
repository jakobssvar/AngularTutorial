import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  hero?: Hero;

  selectedHero?: Hero;
  constructor(private route: ActivatedRoute, private messageService: MessageService,
    private location: Location, private heroService: HeroService) {

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 8));
  }
  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.selectedHero = this.heroService.getHero(Number(routeParams.id));
      if (this.selectedHero != undefined) {
        console.log("error in the hole, where the thing is and the other thing goes around the thingy");
        return;
      }
    })

    this.getHeroes();

  }
  backButtonClick(): void {
    this.location.back();


  }
}

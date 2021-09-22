import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HeroesComponent } from '../heroes/heroes.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  @Input() expLimit: number[] = HeroesComponent.expLimits;
 

  constructor(private route: ActivatedRoute,
    private location: Location, private heroService: HeroService
    ) {
    
  }

  ngOnInit(): void {
    this.getHero();
  }


  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    of(this.heroService.getHero(id))
      .subscribe(hero => this.hero = hero);
  }


}

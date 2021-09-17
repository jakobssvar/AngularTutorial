import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("Your Heroes are ready!");
    return heroes;

  }
  getHero(id: number) {
    const hero = HEROES.find(h => h.id === id);
    this.messageService.add("Hero Found.");

  }

  constructor(public messageService: MessageService) { }
}

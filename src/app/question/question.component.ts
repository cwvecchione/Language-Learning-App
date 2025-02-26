import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: [
    './question.component.css',
  ],
})
export class QuestionComponent {
  constructor(public gameService: GameService) {}
}

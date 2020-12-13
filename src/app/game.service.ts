import { Injectable } from '@angular/core';
import { Questions } from './mock-questions';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private messageService: MessageService) {}

  private score = 0;
  private highScore = 0;
  private currentImages = [[], []];
  private currentQuestion = '';
  private showModal = false;
  private correctAnswer = false;
  private interval = null;
  private timerDuration = 1000 * 60;
  private timerSequence = 100;
  private timerChunk = 100 / this.timerDuration * this.timerSequence;
  private timeLeftPercent = 0;
  private gameEnded = false;

  public getGameEnded(): boolean {
    return this.gameEnded;
  }

  public getTimeLeftPercent(): number {
    return this.timeLeftPercent;
  }

  public getShowModal(): boolean {
    return this.showModal;
  }

  public getCorrectAnswer(): boolean {
    return this.correctAnswer;
  }

  public getScore(): number {
    return this.score;
  }

  public getHighScore(): number {
    return this.highScore;
  }

  public getCurrentImages(): string[][] {
    return this.currentImages;
  }

  public getCurrentQuestion(): string {
    return this.currentQuestion;
  }

  public startGame(): void {
    this.score = 0;
    this.currentQuestion = '';
    this.getRandomQuestions();
    this.gameEnded = false;
    this.timeLeftPercent = 0;

    this.interval = setInterval(() => {
      if (this.timeLeftPercent < 100) {
        this.timeLeftPercent += this.timerChunk;
      } else {
        clearInterval(this.interval);
        if (this.score > this.highScore) {
          this.highScore = this.score;
        }
        this.gameEnded = true;
      }
    }, this.timerSequence);
  }

  private getRandomQuestions(): void {
    // randomize array
    Questions.sort(() => 0.5 - Math.random());
    // get first 4 images
    const randomImages = Questions.slice(0, 4);
    // pick one question randomly to be the current question
    this.currentQuestion = randomImages[Math.floor(Math.random() * randomImages.length)];
    // update the images to be shown in our game
    this.currentImages = [[randomImages[0], randomImages[1]], [randomImages[2], randomImages[3]]];
  }

  public checkAnswer(guess: string): void {
    if (!this.gameEnded && !this.showModal) {
      if (guess === this.currentQuestion) {
        this.correctAnswer = true;
        this.score += 1;
      } else {
        this.correctAnswer = false;
      }
      this.showModal = true;
      this.messageService.sendMessage('CardClicked');

      setTimeout(() => {
        this.showModal = false;
        this.getRandomQuestions();
      }, 1200);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.quizProgress = parseInt(localStorage.getItem('quizProgress'));
      this.quizService.questions = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.quizProgress == 10) {
        this.router.navigate(['/result']);
      } else {
        this.startTimer();
      }
    } else {
      this.quizService.seconds = 0;
      this.quizService.quizProgress = 0;
      this.quizService.getQuestions().subscribe((data: any) => {
        this.quizService.questions = data;
        this.startTimer();
      });
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(questionId, choice) {
    this.quizService.questions[this.quizService.quizProgress].Answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.questions));
    this.quizService.quizProgress++;
    localStorage.setItem('quizProgress', this.quizService.quizProgress.toString());
    if (this.quizService.quizProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }
}
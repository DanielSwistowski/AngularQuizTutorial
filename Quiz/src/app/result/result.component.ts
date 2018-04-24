import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('quizProgress')) == 10) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.quizProgress = parseInt(localStorage.getItem('quizProgress'));
      this.quizService.questions = JSON.parse(localStorage.getItem('qns'));

      this.quizService.getAnswers().subscribe((data: any) => {
        this.quizService.correctAnswersCount = 0;
        this.quizService.questions.forEach((e, i) => {
          if (e.Answer == data[i]) {
            this.quizService.correctAnswersCount++;
            e.Correct = data[i];
          }
        });
      });
    } else {
      this.router.navigate(['/quiz']);
    }
  }

  OnSubmit() {
    this.quizService.submitScore().subscribe(() => { this.restart(); });
  }

  restart() {
    localStorage.setItem('seconds', "0");
    localStorage.setItem('quizProgress', "0");
    localStorage.setItem('qns', "");
    this.router.navigate(['/quiz']);
  }
}
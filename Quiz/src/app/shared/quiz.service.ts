import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {

  readonly rootUrl = "http://localhost:65513";
  questions: any[];
  seconds: number;
  timer;
  quizProgress: number;
  correctAnswersCount: number = 0;

  constructor(private http: HttpClient) { }


  insertParticipant(name: string, email: string) {
    var body = {
      Name: name,
      Email: email
    }
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + '/api/Questions');
  }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getAnswers() {
    var body = this.questions.map(x => x.QuestionId);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswersCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + '/api/UpdateOutput', body);
  }
}
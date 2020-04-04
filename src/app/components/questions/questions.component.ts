import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {ConnectToDBService} from '../../services/connect-to-db.service'
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Inject } from '@angular/core'
export interface Item {
  questions:any[]

}


export interface userData{
  score:any,
  indicesOfAnswers:any[],
  indicesOfUserClicks:any[],
  indicesOfCorrectAnswers:any[],
  
}


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  @Input() type: any;
  @Input() title: any;
  @Input() level: any;
  reviewCounter=-1
  counter=0
  showScore=0
  ii:any[]=[]
  question:any=""
  score:any=0
  indicesOfAnswers:any[]=[]
  indicesOfUserClicks:any[]=[]
  indicesOfCorrectAnswers:any[]=[]
  questions:any[]=[]
  endOfQuiz=1
  showCorrectQuestion=0
  constructor(private DB:ConnectToDBService) {
    
   }

  ngOnInit(): void {
    this.DB.getQuestions('a','a','d').forEach(e=>{
      e.forEach(m=>{
        m.data()
        this.ii.push(m.data())
        console.log(m.data())
      })

    }).finally(()=>{
      this.nextQuestion()
    })


  } 
  nextQuestion(){
    if(this.counter<this.ii.length){
      this.question=this.ii[this.counter]
      this.counter++

    }
    else{
      this.counter=0
      this.showScore=1
      this.showResult()
    }

  }
  showResult(){
    this.question=""
    this.endOfQuiz=1
    this.score=(this.score/this.indicesOfAnswers.length)*100

    console.log(this.score,this.indicesOfCorrectAnswers,this.indicesOfUserClicks,this.indicesOfAnswers)


  }
  calculateScore(click,index){
    this.questions.push(click)

    
    this.indicesOfUserClicks.push(index)
    this.indicesOfAnswers.push(click.options.indexOf(click.answer))

    console.log('nn',click)
    if(click.options[index]==click.answer){
      this.score++
      this.indicesOfCorrectAnswers.push(1)


      console.log('correct')
    }else{
      console.log('wrong')
      this.indicesOfCorrectAnswers.push(0)

    }
  }
  showLeaderBoard(){

  }
  showOtherQuizez(){

  }
  showCorrectAnswers(m){
    this.endOfQuiz=0
    this.showScore=0
    this.showCorrectQuestion=1
    this.reviewCounter++
    if(this.counter<this.ii.length){
      this.question=this.ii[this.counter]
      this.counter++
    }
    
    else{
      this.reviewCounter=-1
      this.counter=0
      this.showCorrectQuestion=0
      this.showScore=1

    }




  }
  
}
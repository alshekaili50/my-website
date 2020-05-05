import { Component, OnInit,Inject,ViewChild,ElementRef,AfterViewInit} from '@angular/core';
import { Input } from '@angular/core';
import {ConnectToDBService} from '../../services/connect-to-db.service'
import {CookieService} from 'ngx-cookie-service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { GeneratedFile } from '@angular/compiler';
import { stringify } from 'querystring';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../modal/modal.component'
import {ChallengesService} from '../../services/challenges.service'
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
  text:any
  textTwitter:any
  textWhatsup:any
  @ViewChild("share") modelShare: ElementRef;

  type: any;
  title: any;
  code: any;
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
  challengeTitle:any

  constructor(private DB:ConnectToDBService,private cookieServices:CookieService,private route: ActivatedRoute,private modalService: NgbModal,
    private challengeServices:ChallengesService) {
    this.type=this.route.snapshot.paramMap.get('type');
    this.title=this.route.snapshot.paramMap.get('title');
    this.code=this.route.snapshot.paramMap.get('code');



    let a=this.cookieServices.get('userName')
    this.challengeServices.getChallengeTitle(this.type,this.title,this.code).then(result=>{
      this.challengeTitle=result
      console.log(result)
    }).catch(e=>{
      console.log(e)
    })

    
   }

  ngOnInit(): void {
    this.DB.getQuestions(this.type,this.title,this.code).forEach(e=>{
      e.forEach(m=>{
        m.data()
        this.ii.push(m.data())
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
    this.cookieServices.set(this.title+this.code,this.score)



  }
  calculateScore(click,index){
    this.questions.push(click)

    
    this.indicesOfUserClicks.push(index)
    this.indicesOfAnswers.push(click.options.indexOf(click.answer))

    if(click.options[index]==click.answer){
      this.score++
      this.indicesOfCorrectAnswers.push(1)


    }else{
      this.indicesOfCorrectAnswers.push(0)

    }
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


  openShare(){
    this.text="حصلت على نتيجة"+" "+this.score +" "+ "في تحدي "+ this.challengeTitle +" حاول أن تتحداني وشاركني نتيجتك" +" \n"+"www.t7de.net"
    this.textTwitter="https://twitter.com/intent/tweet?text="+encodeURIComponent(this.text.trim())
    this.textWhatsup="https://wa.me/whatsappphonenumber/?text="+this.text
    console.log(this.textTwitter)

    this.modalService.open( this.modelShare,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
    
    });

  }

}




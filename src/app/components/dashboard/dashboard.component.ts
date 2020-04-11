import { Component, OnInit,ViewChild ,AfterViewChecked,ElementRef,TemplateRef,ViewChildren  } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {ModalComponent} from '../modal/modal.component'
import { ResultComponent } from '../result/result.component';
import {ChallengesService} from '../../services/challenges.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit  {
  @ViewChildren('ModalComponent') private modal: ModalComponent
  @ViewChild("share") modelShare: ElementRef;
  textWhatsup:any
  textTwitter:any
  text:any
  numberOfChallenges:number=0
  userName:string
  score:number=0
  challenges:any
  finishedQuizzez:any
  constructor(private cookieService:CookieService,private _bottomSheet: MatBottomSheet,private modalService: NgbModal,private router: Router,private challengesServices:ChallengesService) { 

  }
  

  ngOnInit(): void {
    const userName: boolean = this.cookieService.check('userName');
    if(!userName){
     
      this.userName="ضيفنا الكريم"
    }else{
      this.userName=this.cookieService.get('userName')
    }


    this.challengesServices.getChallengesScores('accents').then(result=>{
      this.finishedQuizzez=result
    }).finally(()=>{
      this.getFinalScore()
    })

  }
  

  openShare(){
    this.text="حصلت على نتيجة "+this.score+" حاول أن تتحداني في اللهجات العربية وشاركني نتيجتك"+" \n"+"www.t7de.net"
    this.textTwitter="https://twitter.com/intent/tweet?text="+encodeURIComponent(this.text.trim())
    this.textWhatsup="https://wa.me/whatsappphonenumber/?text="+this.text
    console.log(this.textTwitter)

    this.modalService.open( this.modelShare,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
    
    });

  }
  getFinalScore(){
    let values=Object.values(this.finishedQuizzez)
    let score=0
    for(let i=0;i<values.length;i++){
      score=score+parseInt(values[i]['score'])

    }
    
    console.log(score/values.length)
    let final=score/values.length
    this.score=parseInt(final.toFixed(0))
  }
}

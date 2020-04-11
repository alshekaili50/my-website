import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service'
import { Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Router, Event,ActivatedRoute, ParamMap, NavigationEnd,ActivatedRouteSnapshot,NavigationStart } from '@angular/router';
@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})

export class ChallengesComponent implements OnInit {
  type:any
  @ViewChild("content") modalContent: ElementRef;


  constructor(private modalService: NgbModal,private router: Router,private cookieService:CookieService,  private route: ActivatedRoute) { 
    this.type=this.route.snapshot.paramMap.get('type');
    console.log(this.type)
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.type=routeParams.type

    });
  
  
    if(!this.cookieService.check('userName')){

    }
    
  
      console.log(this.type)
  }

  open(type,title,code) {
    console.log('ui')
    if(this.cookieService.check('userName')){
      this.router.navigate(['/questions',type,title,code])
      return
    }
    this.modalService.open(this.modalContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result)
      this.cookieService.set('userName',result)
      this.router.navigate(['/questions',type,title,code])

    }, (reason) => {
    
    });
  }



}

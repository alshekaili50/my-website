import { Component, OnInit,ElementRef,TemplateRef,ViewChild ,AfterViewInit,Input} from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, Event,ActivatedRoute, ParamMap, NavigationEnd,ActivatedRouteSnapshot,NavigationStart } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild("list") modalContent: ElementRef;
  @ViewChild("getUserName") modalGetUserName: ElementRef;

  @Input() private state:any

  constructor(private cookieService:CookieService,private modalService: NgbModal,private router: Router) { }
  ngAfterViewInit(): void {
    if(!this.cookieService.check('userName')){
      this.getUserName()
    }
    else{
      this.open()
    }
  }

  getUserName() {
    this.modalService.open(this.modalGetUserName,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result)
      this.cookieService.set('userName',result)
      

    }, (reason) => {
    
    }).then(s=>{
      this.open()
    })
  }

  open() {
    this.modalService.open( this.modalContent,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
    
    });
  }

  navigate(type,title,code){
    this.router.navigate(['/questions',type,title,code])

  }

}

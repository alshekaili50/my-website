import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router"
import {CookieService} from 'ngx-cookie-service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userNmae:string
  title = 'my-website';
  constructor(private modalService: NgbModal,private router: Router,private cookieService:CookieService) {}


}

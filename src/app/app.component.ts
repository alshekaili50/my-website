import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-website';
  constructor(private modalService: NgbModal,private router: Router) {}

  open(content,b,c) {
    console.log(b,c)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(content)
      console.log(result)
      this.router.navigate(['/questions', b,c,1])

    }, (reason) => {
    
    });
  }



}

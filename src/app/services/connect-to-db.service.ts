import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConnectToDBService {


  constructor(private firestore: AngularFirestore) { }
  getQuestions(type,title,level){


      return this.firestore.collection('challenges/'+type+'/'+title+'/'+level+'/questions').get()


    
  }

}

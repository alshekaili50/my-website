import { Injectable } from '@angular/core';
import * as data from '../interfaces/challengesinfo.json'
import { element } from 'protractor';
import { rejects } from 'assert';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  constructor(private cookieService:CookieService) { }

   getChallengeTitle(type,title,code){
    var promise = new Promise((resolve, reject) => {
    const obj =JSON.stringify(data)
    let m=JSON.parse(obj)
    let keys=Object.keys(m['default'][type][title])
    keys.forEach(element=>{
      m['default'][type][title][element]
      if(m['default'][type][title][element].challengeCode==code){
        resolve(m['default'][type][title][element].challengeTitle)
      }
    })
      
    })

    
    return promise
  
    
  

  }
  getAllChallenges(){

  }
  getAlltypeChallenges(){

  }
  getAllTitleChallenges(){

  }
  getChallengesScores(type){
    let finishedQuizzez:{
      quiz:any,
      score:any
  
    }[]=[]
  
    const obj =JSON.stringify(data)
    let m=JSON.parse(obj)
    this.cookieService.getAll()
    let keys=Object.keys(this.cookieService.getAll())
    let title:any
    let code:any
    var promise = new Promise((resolve, reject) => {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "userName" || keys[i]=="finalScore") 
          continue;
        title=keys[i].split(/[0-9]/)[0]
        code=keys[i].replace(title,'')
        console.log(title,code)
        this.getChallengeTitle(type,title,code).then(result=>{
          finishedQuizzez.push({
            quiz:result,
            score:this.cookieService.get(keys[i])
          })
        })
  
  
  
      }
  
      resolve(finishedQuizzez)
        
      })
  
      
      return promise

    
  }
}

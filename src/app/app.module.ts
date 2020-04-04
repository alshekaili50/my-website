import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { QuestionsComponent } from './components/questions/questions.component';
import {MatCardModule} from '@angular/material/card';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatInputModule} from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    QuestionsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    MatInputModule,
    MatFormFieldModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

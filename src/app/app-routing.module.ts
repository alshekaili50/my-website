import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChallengesComponent } from './components/challenges/challenges.component';

const routes: Routes = [
  { path: 'challenges/:type', component: ChallengesComponent},
  { path: '', component: DashboardComponent},

  { path: 'questions/:type/:title/:code', component: QuestionsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

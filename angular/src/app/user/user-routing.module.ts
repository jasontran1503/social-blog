import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSummaryPageComponent } from './pages/user-summary-page/user-summary-page.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{ path: ':username', component: UserSummaryPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

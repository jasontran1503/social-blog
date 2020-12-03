import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { LayoutModule } from './shared/layout/layout.module';
import { Page404Component } from './shared/layout/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', redirectTo: 'introduce', pathMatch: 'full' },
      {
        path: 'introduce',
        loadChildren: () =>
          import('./introduce/introduce.module').then((m) => m.IntroduceModule),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('./post/post.module').then((m) => m.PostModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '404',
    component: Page404Component,
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [LayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

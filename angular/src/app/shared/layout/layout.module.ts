import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { Page404Component } from './page404/page404.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { UsersHelperComponent } from './users-helper/users-helper.component';

@NgModule({
  declarations: [
    HeaderComponent,
    Page404Component,
    PaginationComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
    UsersHelperComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    Page404Component,
    PaginationComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
    UsersHelperComponent
  ]
})
export class LayoutModule { }

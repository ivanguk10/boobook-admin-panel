import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DropdownDirective } from './dropdown.directive';
import {MenuComponent} from './components/menu/menu.component';
import {AuthorItemComponent} from './components/authors/room-list/author-item/author-item.component';
import {AuthorListComponent} from './components/authors/room-list/author-list.component';
import {BookItemComponent} from './components/books/book-item/book-item.component';
import {BookListComponent} from './components/books/book-list.component';
import {BookAddComponent} from './components/books/book-add/book-add.component';
import {AuthorAddComponent} from './components/authors/room-list/author-add/author-add.component';
import {OrderListComponent} from './components/orders/room-list/order-list.component';
import {OrderItemComponent} from './components/orders/room-list/order-item/order-item.component';
import {AuthorUpdateComponent} from './components/authors/room-list/author-update/author-update.component';
import {BookUpdateComponent} from './components/books/book-update/book-update.component';
import {DatePipe} from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
  },

  {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'books', component: BookListComponent,  canActivate: [AuthGuard]},
  {path: 'authors', component: AuthorListComponent,  canActivate: [AuthGuard]},
  {path: 'orders', component: OrderListComponent,  canActivate: [AuthGuard]},
  {path: 'books/add', component: BookAddComponent,  canActivate: [AuthGuard]},
  {path: 'authors/add', component: AuthorAddComponent,  canActivate: [AuthGuard]},
  {path: 'authors/update/:id', component: AuthorUpdateComponent, canActivate: [AuthGuard]},
  {path: 'books/update/:id', component: BookUpdateComponent, canActivate: [AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    AlertComponent,
    AuthComponent,
    LoginComponent,
    DropdownDirective,
    MenuComponent,
    AuthorItemComponent,
    AuthorListComponent,
    BookItemComponent,
    BookListComponent,
    HeaderComponent,
    BookAddComponent,
    AuthorAddComponent,
    OrderListComponent,
    OrderItemComponent,
    AuthorUpdateComponent,
    BookUpdateComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule,  DropdownDirective, ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

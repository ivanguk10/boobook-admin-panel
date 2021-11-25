import { Component, OnInit } from '@angular/core';
import {BookModel} from '../../../@core/models/book.model';
import {BookService} from '../../../@core/services/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: BookModel[];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(res => {
      this.books = res;
    });
  }

  public onClickAdd(): void{
    this.router.navigate(['/books/add']);
  }

  public onReturnToMenuClick(): void {
    this.router.navigate(['menu']);
  }

  public onDelete(id: number): void{
    this.books = this.books.filter(author => author.id !== id);
  }
}

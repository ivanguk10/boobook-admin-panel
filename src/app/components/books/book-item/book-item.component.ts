import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {BookModel} from '../../../../@core/models/book.model';
import {BookService} from '../../../../@core/services/book.service';

@Component({
  selector: 'app-room-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnInit {
  @Input() book: BookModel;

  @Output()
  OnDelete: EventEmitter<any> = new EventEmitter();

  constructor(private bookService: BookService, private router: Router
  ) {}

  ngOnInit(): void {
  }

  public onDeleteClick(): void{
    this.bookService.deleteBook(this.book.id).subscribe(val => val);
    this.OnDelete.emit();
  }

  public onUpdateClick(): void {
    this.router.navigate(['books/update', this.book.id]);
  }
}

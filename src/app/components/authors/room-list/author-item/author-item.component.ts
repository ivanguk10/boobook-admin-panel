import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthorModel} from '../../../../../@core/models/author.model';
import {AuthorService} from '../../../../../@core/services/author.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css'],
})
export class AuthorItemComponent implements OnInit {
  @Input() author: AuthorModel;

  private DATE_FORMAT = 'yyyy-MM-dd';

  @Output()
  OnDelete: EventEmitter<any> = new EventEmitter();
  constructor(private authorService: AuthorService, private router: Router, private datePipe: DatePipe
  ) {
  }

  public onDeleteClick(): void {
    this.authorService.DeleteAuthor(this.author.id).subscribe(val => val);
    this.OnDelete.emit();
  }

  public onUpdateClick(): void {
    this.router.navigate(['authors/update', this.author.id]);
  }

  public getBornDate(): string{
    const date = new Date(this.author.bornDate);
    return this.datePipe.transform(date, this.DATE_FORMAT);
  }

  public getDiedDate(): string{
    const date = new Date(this.author.diedDate);
    return this.datePipe.transform(date, this.DATE_FORMAT);
  }

  public IsDead(): boolean {
    return new Date(this.author.diedDate).toLocaleDateString() !== new Date('0001-01-01').toLocaleDateString();
  }

  ngOnInit(): void {
  }
}

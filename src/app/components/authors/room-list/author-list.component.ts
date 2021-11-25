import { Component, OnInit } from '@angular/core';
import {AuthorModel} from '../../../../@core/models/author.model';
import {AuthorService} from '../../../../@core/services/author.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: AuthorModel[];

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.authorService.GetAuthors().subscribe(res => {
      this.authors = res;
    });
  }

  public onClickAdd(): void{
    this.router.navigate(['/authors/add']);
  }

  public onDelete(id: number): void{
    this.authors = this.authors.filter(author => author.id !== id);
  }
}

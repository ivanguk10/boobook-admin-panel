import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorService} from '../../../../../@core/services/author.service';
import {AuthorModel} from '../../../../../@core/models/author.model';
import {HandleAlert} from '../../../../../@core/components/handle.alert';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css'],
})
export class AuthorAddComponent extends HandleAlert implements OnInit {

  authorForm: FormGroup;

  constructor(private authorService: AuthorService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit(): void {
/*    if (!this.bookForm.valid) {
      return;
    }*/
    const authorModel = new AuthorModel();
    authorModel.bornDate = this.authorForm.value.bornDate;
    authorModel.description = this.authorForm.value.description;
    authorModel.name = this.authorForm.value.name;
    authorModel.diedDate = this.authorForm.value.diedDate;
    if (authorModel.diedDate == null){
      authorModel.diedDate = new Date('1/1/0001 12:00:00 AM');
    }

    this.authorService.AddAuthor(authorModel).subscribe(value => {
      this.router.navigate(['authors']);
    },
      error => {
      this.message = 'Error on server side.';
    });
  }
  private initForm(): void {
    this.authorForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}\'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)'),
        Validators.maxLength(255),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      bornDate: new FormControl(null, Validators.required),
      diedDate: new FormControl(null)
    });
  }

  public onReturnToListClick(): void{
    this.router.navigate(['authors']);
  }
}

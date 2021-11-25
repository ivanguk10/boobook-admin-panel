import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorService} from '../../../../../@core/services/author.service';
import {AuthorModel} from '../../../../../@core/models/author.model';
import {formatDate} from '@angular/common';
import {HandleAlert} from '../../../../../@core/components/handle.alert';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.css'],
})
export class AuthorUpdateComponent extends HandleAlert implements OnInit {

  authorForm: FormGroup;
  authorModel: AuthorModel;
  id: number;

  constructor(private authorService: AuthorService, private router: Router, private activateRoute: ActivatedRoute) {
    super();
    this.id = activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.initForm();
    this.authorService.GetAuthor(this.id).subscribe(val => {
      this.authorForm.controls.name.patchValue(val.name);
      this.authorForm.controls.description.patchValue(val.description);
      this.authorForm.controls.bornDate.patchValue(formatDate(val.bornDate, 'yyyy-MM-dd', 'en'));
      if (new Date(val.diedDate).toLocaleDateString() !== new Date('0001-01-01').toLocaleDateString()){
        this.authorForm.controls.diedDate.patchValue(formatDate(val.diedDate, 'yyyy-MM-dd', 'en'));
      }
    });
  }
  onSubmit(): void {
    const authorModel = new AuthorModel();
    authorModel.id = this.id;
    authorModel.bornDate = this.authorForm.value.bornDate;
    authorModel.description = this.authorForm.value.description;
    authorModel.name = this.authorForm.value.name;
    authorModel.diedDate = this.authorForm.value.diedDate;
    if (authorModel.diedDate == null || authorModel.diedDate.toString() === ''){
      authorModel.diedDate = new Date('0001-01-01');
    }

    this.authorService.UpdateAuthor(authorModel).subscribe(value => this.message = 'Author was updated');
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

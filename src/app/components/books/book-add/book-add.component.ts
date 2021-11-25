import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {BookService} from '../../../../@core/services/book.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorModel} from '../../../../@core/models/author.model';
import {AuthorService} from '../../../../@core/services/author.service';
import {BookUploadModel} from '../../../../@core/models/book.upload.model';
import {HandleAlert} from '../../../../@core/components/handle.alert';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent extends HandleAlert implements OnInit {

  bookForm: FormGroup;
  authors: AuthorModel[];
  imageToDisplay: string;

  constructor(private bookService: BookService, private router: Router, private authorService: AuthorService) {
    super();
  }

  ngOnInit(): void {
    this.authorService.GetAuthors().subscribe(data => {
      this.authors = data;
      console.log(this.authors);
    });
    this.initForm();
  }
  onSubmit(): void {
/*    if (!this.bookForm.valid) {
      return;
    }*/
    const bookUploadModel = new BookUploadModel();
    bookUploadModel.authorId = this.bookForm.value.authorId;
    bookUploadModel.description = this.bookForm.value.description;
    bookUploadModel.name = this.bookForm.value.name;
    bookUploadModel.price = this.bookForm.value.price;
    bookUploadModel.image = this.bookForm.value.image;

    this.bookService.addBook(bookUploadModel).subscribe(value => {
      this.router.navigate(['books']);
    },
      error => {
      this.message = 'Error on server side.';
    });
  }
  private initForm(): void {
    this.bookForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(3),
      ]),
      authorId: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });
  }

  public onReturnToListClick(): void{
    this.router.navigate(['books']);
  }

  public onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bookForm.get('image').setValue(file);
      this.getBase64(file);
    }
  }

  private getBase64(file): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageToDisplay = reader.result as string;
    };
    reader.onerror =  (error) => {
      console.log('Error: ', error);
    };
  }
}

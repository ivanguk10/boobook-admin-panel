import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookModel} from '../../../../@core/models/book.model';
import {BookService} from '../../../../@core/services/book.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorModel} from '../../../../@core/models/author.model';
import {AuthorService} from '../../../../@core/services/author.service';
import {BookUploadModel} from '../../../../@core/models/book.upload.model';
import {formatDate} from '@angular/common';
import {HandleAlert} from '../../../../@core/components/handle.alert';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css'],
})
export class BookUpdateComponent extends HandleAlert implements OnInit {

  bookForm: FormGroup;
  id: number;
  bookModel: BookModel;
  authors: AuthorModel[];
  imageToDisplay: string;

  constructor(private bookService: BookService, private router: Router,
              private authorService: AuthorService, private activateRoute: ActivatedRoute) {
    super();
    this.id = activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.authorService.GetAuthors().subscribe(data => {
      this.authors = data;
    });
    this.initForm();
    this.bookService.getBook(this.id).subscribe(val => {
      this.bookForm.controls.name.patchValue(val.name);
      this.bookForm.controls.description.patchValue(val.description);
      this.bookForm.controls.authorId.patchValue(val.author?.id);
      this.bookForm.controls.price.patchValue(val.price);
      this.imageToDisplay = 'data:image/png;base64,' + val.image;
      this.bookForm.get('image').setValue(this.dataURLtoFile(this.imageToDisplay, 'test.png'));
    });
  }
  onSubmit(): void {
    const bookUploadModel = new BookUploadModel();
    bookUploadModel.id = this.id;
    bookUploadModel.authorId = this.bookForm.value.authorId;
    bookUploadModel.description = this.bookForm.value.description;
    bookUploadModel.name = this.bookForm.value.name;
    bookUploadModel.price = this.bookForm.value.price;
    bookUploadModel.image = this.bookForm.value.image;
    this.bookService.addBook(bookUploadModel).subscribe(value => this.message = 'Book was updated');
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
      const file: File = event.target.files[0];
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

  private dataURLtoFile(dataurl, filename): File {

    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
  }
}

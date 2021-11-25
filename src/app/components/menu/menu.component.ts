import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  error: string = null;
  signupForm: FormGroup;
  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
  }

  public onAuthorClick(e: Event): void{
    e.preventDefault();
    this.router.navigate(['/authors']);
  }

  public onBookClick(e: Event): void{
    e.preventDefault();
    this.router.navigate(['/books']);
  }

  public onOrderClick(e: Event): void{
    e.preventDefault();
    this.router.navigate(['/orders']);
  }
}

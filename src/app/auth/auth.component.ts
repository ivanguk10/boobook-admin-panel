import { Component, OnInit } from '@angular/core';
import {UserService} from '../../@core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.HasAccessToken()){
      this.router.navigate(['menu']);
    }
  }

}

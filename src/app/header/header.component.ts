import { Component, OnInit } from '@angular/core';
import {UserService} from '../../@core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogout(): void {
    this.userService.SetAccessToken('');
    this.router.navigate(['auth']);
  }
}

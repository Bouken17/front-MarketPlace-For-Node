import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.isAuth$.subscribe(
      (bool: boolean) => {//recois un boolean
        this.isAuth = bool;
      }
    )
  }

  logOut(): void{
    this.authService.logOut();
  }

}

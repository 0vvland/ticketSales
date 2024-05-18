import { Component, OnInit } from '@angular/core'
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})

export class AuthorizationComponent implements OnInit {
  login: string;
  password: string;
  cardNumber: string = '';
  isRememberMe: boolean;
  isHaveCard: boolean;
  constructor(private authService: AuthService, private messageService: MessageService) { }

    ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  async onAuth(): Promise<void> {
    const user: IUser = {
      login: this.login,
      password: this.password,
    }
    const result = await this.authService.authUser(this.login, this.password, this.isRememberMe);
    if (result !== true) {
      this.messageService.add({severity:'error', summary: result});
      return;
    }
    this.messageService.add({severity:'success', summary: 'You are authorized!'});
  }
}

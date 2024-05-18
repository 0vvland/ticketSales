import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  passwordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPasswordRepeat: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onChange() {
    if (this.oldPassword !== this.authService.user?.password) {
      this.messageService.add({severity: 'error', summary: 'Old password is wrong'});
      return;
    }
    if (this.newPassword !== this.repeatPassword) {
      this.messageService.add({severity: 'error', summary: 'New passwords are not the same'});
      return
    }
    this.authService.changePassword(this.newPassword);
    this.messageService.add({severity: 'success', summary: 'Password changed!'});
  }

}

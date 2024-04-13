import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {TabViewModule} from "primeng/tabview";
import {ChangePasswordComponent} from './change-password/change-password.component';
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    InputTextModule,
    ToastModule,
    FormsModule,
    ButtonModule,
  ],
  providers: [
    MessageService
  ]
})
export class SettingsModule {
}

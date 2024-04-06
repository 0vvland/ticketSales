import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketInfoRoutingModule} from './ticket-info-routing.module';
import {TicketItemComponent} from './ticket-item/ticket-item.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    TicketInfoRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    CalendarModule,
  ]
})
export class TicketInfoModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketInfoRoutingModule } from './ticket-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    TicketInfoRoutingModule,
    CardModule,
    ButtonModule,
  ]
})
export class TicketInfoModule { }
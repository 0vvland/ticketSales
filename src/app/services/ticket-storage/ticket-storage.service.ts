import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";
import {TicketService} from "../ticket/ticket.service";
import { firstValueFrom, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketStorageService {
  private ticketStorage: ITour[] = [];
  constructor(private ticketService: TicketService) { }

  get tickets () {
    return this.ticketStorage;
  }

  async getTicket(id: string) {
    return await firstValueFrom(this.ticketService.getTicket(id));
  }

  fetchTickets (force?: boolean) {
    if (this.ticketStorage.length && !force) {
      return new Observable<ITour[]>((subscriber) => {
        subscriber.next(this.ticketStorage);
        subscriber.complete();
      });
    }
    const observ = this.ticketService.getTickets()
    observ.subscribe(
      (data) => {
        this.ticketStorage = data;
      }
    )

    return observ;
  }

  setStorage(data: ITour[]): void {
   // запись данных в this.ticketStorage
  }
  getStorage(): ITour[] {
     // возвращает в this.ticketStorage
    return []
  }
}

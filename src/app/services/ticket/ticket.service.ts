import {Injectable} from '@angular/core';
import {TicketRestService} from "../ticket-rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {INearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours";
import { IOrder } from "../../models/orders";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>()
  readonly $ticketType = this.ticketSubject.asObservable()

  constructor(private ticketServiceRest: TicketRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map((items) => {
      return items.concat(items.filter(({type}) => type === 'single'));
    }));
  }

  getTicket(id: string): Observable<ITour> {
    return this.ticketServiceRest.getTicket(id);
  }

  getTicketTypeObservable() {
    return this.ticketSubject.asObservable();
  }

  updateTour(type: ITourTypeSelect) {
    this.ticketSubject.next(type);
  }

  getError() {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTours() {
    return this.ticketServiceRest.getNearestTickets();
  }

  getTourLocations() {
    return this.ticketServiceRest.getLocationList();
  }

  getRandomNearestEvent(type: number) {
    return this.ticketServiceRest.getRandomNearestEvent(type);
  }

  transformData(data: INearestTour[], tourLocations: ITourLocation[]) {
    const newTicketData: INearestTour[] = [];
    data.forEach((e) => {
      newTicketData.push({
        ...e,
        region: tourLocations.find((region) => e.locationId === region.id)
      })
    });
    return newTicketData;
  }

  sendTourData(data: IOrder) {
    return this.ticketServiceRest.sendTourData(data)
  }
}


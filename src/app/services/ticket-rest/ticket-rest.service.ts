import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {INearestTour, ITour, ITourLocation} from "../../models/tours";
import { IOrder } from "../../models/orders";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tours/');
  }

  getTicket(id: string): Observable<ITour> {
    return this.http.get<ITour>(`http://localhost:3000/tours/${id}`);
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets() {
    return this.http.get<INearestTour[]>('http://localhost:3000/tours/');
  }

  getLocationList() {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/');
  }

  getRandomNearestEvent(type: number) {
    return this.http.get(`/assets/mocks/nearestTours${type + 1}.json`)
  }

  sendTourData(data: IOrder) {
    return this.http.post(`http://localhost:3000/orders/`, data)
  }

  createTour(formParams: FormData) {
    return this.http.post(`http://localhost:3000/tours/`, formParams)
  }

  getSimilarTour(name: string) {
    return this.http.get(`http://localhost:3000/tours/name/${name}`)
  }
}

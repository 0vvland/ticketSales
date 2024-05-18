import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menu";
import {ITourTypeSelect} from "../../../models/tours";
import {TicketService} from "../../../services/ticket/ticket.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";
import { HttpClient } from "@angular/common/http";
import { TicketStorageService } from "../../../services/ticket-storage/ticket-storage.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  constructor(
    private ticketService: TicketService,
    private ticketStorage: TicketStorageService,
    private messageService: MessageService,
    private settingsService: SettingsService,
    private http: HttpClient
  ) {
  }

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }

  onChangeType(ev: { ev: Event, value: IMenuType }): void {
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: Date | PointerEvent) {
    const selected = ev instanceof PointerEvent ? undefined : ev
    this.ticketService.updateTour({date: selected})
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.log('err', err)
        this.messageService.add({severity: 'error', summary: err.error});
      }
    });
  }

  initSettingsData() {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    })
  }

  initTours() {
    this.http.post('http://localhost:3000/tours/generate', {}).subscribe((data) => {
      this.ticketStorage.fetchTickets(true);
    })
  }

  deleteTours() {
    this.http.delete('http://localhost:3000/tours/clear').subscribe((data) => {
      this.ticketStorage.fetchTickets(true);
    })
  }
}

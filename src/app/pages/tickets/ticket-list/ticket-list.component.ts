import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketStorageService} from "../../../services/ticket-storage/ticket-storage.service";
import {Router} from "@angular/router";
import {TicketService} from "../../../services/ticket/ticket.service";
import {debounceTime, fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TicketListComponent implements OnInit {
  private tourUnsubscriber: Subscription;
  search: string = '';
  private ticketFilterType: ITourTypeSelect = {label: 'Все', value: 'all'};


  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;

  constructor(
    private router: Router,
    private ticketStorage: TicketStorageService,
    private ticketService: TicketService
  ) {
  }

  get tickets() {
    return this.ticketStorage.tickets;
  }

  get filteredTickets() {
    const search = this.search.toLowerCase()
    const filterDate = this.ticketFilterType.date ? new Date(this.ticketFilterType.date).toISOString().split('T')[0] : null;
    return this.ticketStorage.tickets
      .filter(({name, type, date}) =>
        (this.ticketFilterType.value === 'all' || type === this.ticketFilterType.value)
        && (!filterDate || filterDate === date)
        && (!this.search || name.toLowerCase().includes(search)));
  }

  ngOnInit(): void {
    this.ticketStorage.fetchTickets();
    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data: ITourTypeSelect) => {
      console.log('data', data)
      this.ticketFilterType = {...this.ticketFilterType, ...data};
    });
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});
    this.searchTicketSub = fromEventObserver.pipe(debounceTime(200)).subscribe((ev) => {
      console.log('changed search value', ev)
    })
  }

  goToTicket(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item._id}`]);
  }
}

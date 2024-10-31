import { Component } from '@angular/core';
import { NewTicketsComponent } from './new-tickets/new-tickets.component';
import { Ticket } from './ticket.model';
import { TicketComponent } from './ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketsComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAdd(ticketData: { title: string; text: string }) {
    const ticket: Ticket = {
      title: ticketData.title,
      request: ticketData.text,
      id: Math.random().toString(),
      status: 'open',
    };
    console.log(ticket.id);
    this.tickets.push(ticket);
  }

  onCLoseTicket(id: string) {
    console.log(id);
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: 'closed' };
      }
      return ticket;
    });
  }
}

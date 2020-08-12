import { TicketCreatedEvent, Publisher, Subjects } from '@rgtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  
}

import { Topics } from '../topics';

export interface TicketUpdatedEvent {
  subject: Topics.ExampleTopic;
  data: {
    id: string;
    title: string;
    userId: string;
  }
}
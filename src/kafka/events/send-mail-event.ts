import { Topics } from '../topics';

export interface SendMailEvent {
  topic: Topics.SendMailTopic;
  data: {
    from?: string,
    to: string,
    subject: string,
    text: string
  }
}
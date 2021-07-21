import { Topics } from '../topics';

export interface AssignmentSubmitEvent {
  topic: Topics.AssignmentSubmitTopic;
  data: {
    assignmentId: string;
    config: string;
    sourceCode: string;
    userId: string;
  }
}
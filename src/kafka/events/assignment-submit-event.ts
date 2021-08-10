import { Topics } from '../topics';

export interface AssignmentSubmitEvent {
  topic: Topics.AssignmentSubmitTopic;
  data: {
    assignmentId: string;
    submissionId: string;
    configFile?: string;
    sourceFile?: string;
    user: {
      token: string,
      extra?: any
    }
  }
}
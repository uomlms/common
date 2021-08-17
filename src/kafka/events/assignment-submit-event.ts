import { Topics } from '../topics';

export interface AssignmentSubmitEvent {
  topic: Topics.AssignmentSubmitTopic;
  data: {
    assignmentId: string;
    submissionId: string;
    sourceFile: string;
    configFile?: string;
    user: {
      token: string,
      extra?: any
    }
  }
}
import { Topics } from '../topics';

export interface AssignmentCorrectionEvent {
    topic: Topics.AssignmentCorrectionTopic;
    data: {
        assignmentId: string;
        submissionId: string;
        status: string;
        result: string;
    }
}
import { Topics } from '../topics';

export interface AssignmentCorrectionEvent {
    topic: Topics.AssignmentCorrectionTopic;
    data: {
        assignmentId: string;
        userId: string;
        status: string;
        result: string;
    }
}
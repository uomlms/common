import { Topics } from '../topics';

enum AssignmentSubmitType {
    "failed",
    "success"
}

export interface AssignmentCorrectionEvent {
    topic: Topics.AssignmentCorrectionTopic,
    data: {
        assignmentId: string;
        userId: string;
        status: AssignmentSubmitType;
        result: string;
    }
}
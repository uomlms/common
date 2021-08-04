import { Topics } from '../topics';

enum AssignmentSubmitType {
    "failed",
    "success"
}

export interface AssignmentCorrectionEvent {
    assignmentId: string;
    userId: string;
    status: AssignmentSubmitType;
    result: string;
}
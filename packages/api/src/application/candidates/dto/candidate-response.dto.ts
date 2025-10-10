import { CandidateStatus } from '../../../domain/candidates/entities/candidate.entity';

/**
 * Response DTO for Candidate
 * What gets sent back to the client
 */
export class CandidateResponseDto {
  id: string;
  email: string;
  name: string;
  phone?: string;
  formId: string;
  currentStageId?: string;
  status: CandidateStatus;
  score?: number;
  organizationId: string;
  createdById: string;
  assignedToId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(candidate: any) {
    this.id = candidate.id;
    this.email = candidate.email;
    this.name = candidate.name;
    this.phone = candidate.phone;
    this.formId = candidate.formId;
    this.currentStageId = candidate.currentStageId;
    this.status = candidate.status;
    this.score = candidate.score;
    this.organizationId = candidate.organizationId;
    this.createdById = candidate.createdById;
    this.assignedToId = candidate.assignedToId;
    this.createdAt = candidate.createdAt;
    this.updatedAt = candidate.updatedAt;
  }
}

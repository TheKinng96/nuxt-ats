/**
 * Domain Entity: Candidate
 * Pure TypeScript class representing a candidate in the system
 * No framework dependencies, just business logic
 */
export class Candidate {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  formId: string;
  currentStageId?: string | null;
  status: CandidateStatus;
  score?: number | null;
  organizationId: string;
  createdById: string;
  assignedToId?: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Candidate>) {
    Object.assign(this, data);
  }

  /**
   * Check if candidate is active
   */
  isActive(): boolean {
    return this.status === CandidateStatus.ACTIVE;
  }

  /**
   * Check if candidate is assigned to someone
   */
  isAssigned(): boolean {
    return !!this.assignedToId;
  }

  /**
   * Assign candidate to a user
   */
  assignTo(userId: string): void {
    this.assignedToId = userId;
  }

  /**
   * Unassign candidate
   */
  unassign(): void {
    this.assignedToId = undefined;
  }

  /**
   * Move candidate to a stage
   */
  moveToStage(stageId: string): void {
    this.currentStageId = stageId;
  }

  /**
   * Update candidate status
   */
  updateStatus(status: CandidateStatus): void {
    this.status = status;
  }
}

export enum CandidateStatus {
  ACTIVE = 'ACTIVE',
  HIRED = 'HIRED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  ON_HOLD = 'ON_HOLD',
}

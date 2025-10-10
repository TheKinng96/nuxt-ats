import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CANDIDATE_REPOSITORY } from '../../../domain/candidates/repositories/candidate.repository.interface';
import type { ICandidateRepository } from '../../../domain/candidates/repositories/candidate.repository.interface';

/**
 * Use Case: Delete a candidate
 */
@Injectable()
export class DeleteCandidateUseCase {
  constructor(
    @Inject(CANDIDATE_REPOSITORY)
    private readonly candidateRepository: ICandidateRepository,
  ) {}

  async execute(id: string, organizationId: string): Promise<void> {
    // Check if candidate exists
    const existing = await this.candidateRepository.findById(
      id,
      organizationId,
    );

    if (!existing) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }

    // Delete the candidate
    await this.candidateRepository.delete(id, organizationId);
  }
}

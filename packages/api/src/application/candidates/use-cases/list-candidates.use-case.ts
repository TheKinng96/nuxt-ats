import { Inject, Injectable } from '@nestjs/common';
import { CANDIDATE_REPOSITORY } from '../../../domain/candidates/repositories/candidate.repository.interface';
import type { ICandidateRepository } from '../../../domain/candidates/repositories/candidate.repository.interface';
import { CandidateResponseDto } from '../dto/candidate-response.dto';

/**
 * Use Case: List all candidates for an organization
 * Business logic for retrieving candidates
 */
@Injectable()
export class ListCandidatesUseCase {
  constructor(
    @Inject(CANDIDATE_REPOSITORY)
    private readonly candidateRepository: ICandidateRepository,
  ) {}

  async execute(organizationId: string): Promise<CandidateResponseDto[]> {
    const candidates = await this.candidateRepository.findAll(organizationId);

    return candidates.map((candidate) => new CandidateResponseDto(candidate));
  }
}

import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CANDIDATE_REPOSITORY } from '../../../domain/candidates/repositories/candidate.repository.interface';
import type { ICandidateRepository } from '../../../domain/candidates/repositories/candidate.repository.interface';
import { CandidateResponseDto } from '../dto/candidate-response.dto';

/**
 * Use Case: Get a single candidate by ID
 */
@Injectable()
export class GetCandidateUseCase {
  constructor(
    @Inject(CANDIDATE_REPOSITORY)
    private readonly candidateRepository: ICandidateRepository,
  ) {}

  async execute(
    id: string,
    organizationId: string,
  ): Promise<CandidateResponseDto> {
    const candidate = await this.candidateRepository.findById(
      id,
      organizationId,
    );

    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }

    return new CandidateResponseDto(candidate);
  }
}

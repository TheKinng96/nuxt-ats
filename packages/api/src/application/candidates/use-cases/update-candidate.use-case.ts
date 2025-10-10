import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CANDIDATE_REPOSITORY } from '../../../domain/candidates/repositories/candidate.repository.interface';
import type { ICandidateRepository } from '../../../domain/candidates/repositories/candidate.repository.interface';
import { UpdateCandidateDto } from '../dto/update-candidate.dto';
import { CandidateResponseDto } from '../dto/candidate-response.dto';

/**
 * Use Case: Update an existing candidate
 */
@Injectable()
export class UpdateCandidateUseCase {
  constructor(
    @Inject(CANDIDATE_REPOSITORY)
    private readonly candidateRepository: ICandidateRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateCandidateDto,
    organizationId: string,
  ): Promise<CandidateResponseDto> {
    // Check if candidate exists
    const existing = await this.candidateRepository.findById(
      id,
      organizationId,
    );

    if (!existing) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }

    // Update the candidate
    const updated = await this.candidateRepository.update(id, dto);

    return new CandidateResponseDto(updated);
  }
}

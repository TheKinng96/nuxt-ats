import {
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CANDIDATE_REPOSITORY } from '../../../domain/candidates/repositories/candidate.repository.interface';
import type { ICandidateRepository } from '../../../domain/candidates/repositories/candidate.repository.interface';
import { CandidateStatus } from '../../../domain/candidates/entities/candidate.entity';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { CandidateResponseDto } from '../dto/candidate-response.dto';

/**
 * Use Case: Create a new candidate
 * Business logic for candidate creation with validation
 */
@Injectable()
export class CreateCandidateUseCase {
  constructor(
    @Inject(CANDIDATE_REPOSITORY)
    private readonly candidateRepository: ICandidateRepository,
  ) {}

  async execute(
    dto: CreateCandidateDto,
    organizationId: string,
    createdById: string,
  ): Promise<CandidateResponseDto> {
    // Check if candidate with same email already exists for this form
    const existing = await this.candidateRepository.findByEmail(
      dto.email,
      organizationId,
    );

    if (existing && existing.formId === dto.formId) {
      throw new ConflictException(
        'A candidate with this email already exists for this form',
      );
    }

    // Create the candidate
    const candidate = await this.candidateRepository.create({
      ...dto,
      organizationId,
      createdById,
      status: CandidateStatus.ACTIVE,
    });

    return new CandidateResponseDto(candidate);
  }
}

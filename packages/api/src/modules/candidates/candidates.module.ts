import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { CandidatesController } from '../../infrastructure/http/candidates/candidates.controller';

// Use Cases
import { ListCandidatesUseCase } from '../../application/candidates/use-cases/list-candidates.use-case';
import { CreateCandidateUseCase } from '../../application/candidates/use-cases/create-candidate.use-case';
import { GetCandidateUseCase } from '../../application/candidates/use-cases/get-candidate.use-case';
import { UpdateCandidateUseCase } from '../../application/candidates/use-cases/update-candidate.use-case';
import { DeleteCandidateUseCase } from '../../application/candidates/use-cases/delete-candidate.use-case';

// Repository
import { CANDIDATE_REPOSITORY } from '../../domain/candidates/repositories/candidate.repository.interface';
import { PrismaCandidateRepository } from '../../infrastructure/database/repositories/prisma-candidate.repository';

/**
 * Candidates Module
 * Encapsulates all candidate-related functionality
 * Follows Clean Architecture principles with clear separation of concerns
 */
@Module({
  imports: [ConfigModule],
  controllers: [CandidatesController],
  providers: [
    // Use Cases
    ListCandidatesUseCase,
    CreateCandidateUseCase,
    GetCandidateUseCase,
    UpdateCandidateUseCase,
    DeleteCandidateUseCase,

    // Repository
    {
      provide: CANDIDATE_REPOSITORY,
      useClass: PrismaCandidateRepository,
    },
  ],
  exports: [
    // Export use cases if needed by other modules
    ListCandidatesUseCase,
    GetCandidateUseCase,
  ],
})
export class CandidatesModule {}

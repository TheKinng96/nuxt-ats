import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { CurrentUserData } from '../../../common/decorators/current-user.decorator';
import { CreateCandidateDto } from '../../../application/candidates/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../../application/candidates/dto/update-candidate.dto';
import { CandidateResponseDto } from '../../../application/candidates/dto/candidate-response.dto';
import { ListCandidatesUseCase } from '../../../application/candidates/use-cases/list-candidates.use-case';
import { CreateCandidateUseCase } from '../../../application/candidates/use-cases/create-candidate.use-case';
import { GetCandidateUseCase } from '../../../application/candidates/use-cases/get-candidate.use-case';
import { UpdateCandidateUseCase } from '../../../application/candidates/use-cases/update-candidate.use-case';
import { DeleteCandidateUseCase } from '../../../application/candidates/use-cases/delete-candidate.use-case';

/**
 * Candidates Controller
 * Handles all HTTP requests related to candidates
 * All routes are protected by JWT authentication
 */
@Controller('candidates')
@UseGuards(JwtAuthGuard)
export class CandidatesController {
  constructor(
    private readonly listCandidatesUseCase: ListCandidatesUseCase,
    private readonly createCandidateUseCase: CreateCandidateUseCase,
    private readonly getCandidateUseCase: GetCandidateUseCase,
    private readonly updateCandidateUseCase: UpdateCandidateUseCase,
    private readonly deleteCandidateUseCase: DeleteCandidateUseCase,
  ) {}

  /**
   * GET /candidates
   * List all candidates for the current organization
   */
  @Get()
  async list(
    @CurrentUser('orgId') orgId: string,
  ): Promise<CandidateResponseDto[]> {
    return this.listCandidatesUseCase.execute(orgId);
  }

  /**
   * GET /candidates/:id
   * Get a single candidate by ID
   */
  @Get(':id')
  async getById(
    @Param('id') id: string,
    @CurrentUser('orgId') orgId: string,
  ): Promise<CandidateResponseDto> {
    return this.getCandidateUseCase.execute(id, orgId);
  }

  /**
   * POST /candidates
   * Create a new candidate
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateCandidateDto,
    @CurrentUser() user: CurrentUserData,
  ): Promise<CandidateResponseDto> {
    return this.createCandidateUseCase.execute(dto, user.orgId, user.userId);
  }

  /**
   * PUT /candidates/:id
   * Update an existing candidate
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCandidateDto,
    @CurrentUser('orgId') orgId: string,
  ): Promise<CandidateResponseDto> {
    return this.updateCandidateUseCase.execute(id, dto, orgId);
  }

  /**
   * DELETE /candidates/:id
   * Delete a candidate
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') id: string,
    @CurrentUser('orgId') orgId: string,
  ): Promise<void> {
    return this.deleteCandidateUseCase.execute(id, orgId);
  }
}

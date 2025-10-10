import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CandidateStatus } from '../../../domain/candidates/entities/candidate.entity';

/**
 * DTO for updating a candidate
 */
export class UpdateCandidateDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  currentStageId?: string;

  @IsEnum(CandidateStatus)
  @IsOptional()
  status?: CandidateStatus;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  assignedToId?: string;
}

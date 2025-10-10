import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO for creating a new candidate
 */
export class CreateCandidateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  formId: string;

  @IsString()
  @IsOptional()
  currentStageId?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;
}

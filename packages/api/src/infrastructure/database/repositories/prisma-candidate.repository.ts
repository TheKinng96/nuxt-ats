import { Injectable } from '@nestjs/common';
import { ICandidateRepository } from '../../../domain/candidates/repositories/candidate.repository.interface';
import { Candidate } from '../../../domain/candidates/entities/candidate.entity';
import { PrismaService } from '../prisma.service';

/**
 * Prisma implementation of ICandidateRepository
 * Handles all database operations for candidates
 */
@Injectable()
export class PrismaCandidateRepository implements ICandidateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string): Promise<Candidate[]> {
    // Set organization context for multi-tenancy middleware
    this.prisma.setOrganizationId(organizationId);

    const candidates = await this.prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return candidates.map(
      (c) => new Candidate(c as unknown as Partial<Candidate>),
    );
  }

  async findById(
    id: string,
    organizationId: string,
  ): Promise<Candidate | null> {
    this.prisma.setOrganizationId(organizationId);

    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
    });

    return candidate
      ? new Candidate(candidate as unknown as Partial<Candidate>)
      : null;
  }

  async findByEmail(
    email: string,
    organizationId: string,
  ): Promise<Candidate | null> {
    this.prisma.setOrganizationId(organizationId);

    const candidate = await this.prisma.candidate.findFirst({
      where: { email },
    });

    return candidate
      ? new Candidate(candidate as unknown as Partial<Candidate>)
      : null;
  }

  async create(data: Partial<Candidate>): Promise<Candidate> {
    if (data.organizationId) {
      this.prisma.setOrganizationId(data.organizationId);
    }

    const candidate = await this.prisma.candidate.create({
      data: {
        email: data.email!,
        name: data.name!,
        phone: data.phone,
        formId: data.formId!,
        currentStageId: data.currentStageId,
        status: data.status!,
        score: data.score,
        organizationId: data.organizationId!,
        createdById: data.createdById!,
        assignedToId: data.assignedToId,
      },
    });

    return new Candidate(candidate as unknown as Partial<Candidate>);
  }

  async update(id: string, data: Partial<Candidate>): Promise<Candidate> {
    const candidate = await this.prisma.candidate.update({
      where: { id },
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        currentStageId: data.currentStageId,
        status: data.status,
        score: data.score,
        assignedToId: data.assignedToId,
      },
    });

    return new Candidate(candidate as unknown as Partial<Candidate>);
  }

  async delete(id: string, organizationId: string): Promise<void> {
    this.prisma.setOrganizationId(organizationId);

    await this.prisma.candidate.delete({
      where: { id },
    });
  }

  async count(organizationId: string): Promise<number> {
    this.prisma.setOrganizationId(organizationId);

    return this.prisma.candidate.count();
  }
}

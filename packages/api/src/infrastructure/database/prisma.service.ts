import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private currentOrgId: string | null = null;

  constructor() {
    super({
      log: ['error', 'warn'],
    });

    // Add multi-tenancy middleware
    this.setupMultiTenancyMiddleware();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Set the organization ID for the current request context
   * This should be called from a request-scoped service or middleware
   */
  setOrganizationId(orgId: string) {
    this.currentOrgId = orgId;
  }

  /**
   * Get the current organization ID
   */
  getOrganizationId(): string | null {
    return this.currentOrgId;
  }

  /**
   * Clear the organization ID (useful for cleanup)
   */
  clearOrganizationId() {
    this.currentOrgId = null;
  }

  /**
   * Setup Prisma middleware to automatically filter by organizationId
   * This ensures all queries are scoped to the current organization
   */
  private setupMultiTenancyMiddleware() {
    this.$use(async (params, next) => {
      // Models that should be filtered by organizationId
      const modelsWithOrgId = [
        'Candidate',
        'Form',
        'Stage',
        'Automation',
        'Interview',
        'User',
      ];

      // Only apply filtering if organizationId is set and model has it
      if (this.currentOrgId && modelsWithOrgId.includes(params.model || '')) {
        // For findMany, findFirst, findUnique, count, aggregate
        if (['findMany', 'findFirst', 'count', 'aggregate'].includes(params.action)) {
          params.args = params.args || {};
          params.args.where = params.args.where || {};

          // Add organizationId filter
          if (!params.args.where.organizationId) {
            params.args.where.organizationId = this.currentOrgId;
          }
        }

        // For findUnique with compound unique constraints
        if (params.action === 'findUnique') {
          params.args = params.args || {};
          params.args.where = params.args.where || {};

          // Ensure organizationId is included in the where clause
          if (!params.args.where.organizationId) {
            params.args.where.organizationId = this.currentOrgId;
          }
        }

        // For create, createMany - automatically add organizationId
        if (['create', 'createMany'].includes(params.action)) {
          params.args = params.args || {};

          if (params.action === 'create') {
            params.args.data = params.args.data || {};
            if (!params.args.data.organizationId) {
              params.args.data.organizationId = this.currentOrgId;
            }
          }

          if (params.action === 'createMany') {
            params.args.data = params.args.data || [];
            if (Array.isArray(params.args.data)) {
              params.args.data = params.args.data.map((record: any) => ({
                ...record,
                organizationId: record.organizationId || this.currentOrgId,
              }));
            }
          }
        }

        // For update, updateMany, delete, deleteMany - ensure it's scoped
        if (['update', 'updateMany', 'delete', 'deleteMany'].includes(params.action)) {
          params.args = params.args || {};
          params.args.where = params.args.where || {};

          if (!params.args.where.organizationId) {
            params.args.where.organizationId = this.currentOrgId;
          }
        }
      }

      return next(params);
    });
  }
}

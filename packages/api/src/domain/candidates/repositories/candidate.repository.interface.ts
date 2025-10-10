import { Candidate } from '../entities/candidate.entity';

/**
 * Repository Interface for Candidate
 * Defines the contract for data access operations
 * Implementation will be in the infrastructure layer
 */
export interface ICandidateRepository {
  /**
   * Find all candidates for an organization
   */
  findAll(organizationId: string): Promise<Candidate[]>;

  /**
   * Find a candidate by ID
   */
  findById(id: string, organizationId: string): Promise<Candidate | null>;

  /**
   * Find a candidate by email within an organization
   */
  findByEmail(
    email: string,
    organizationId: string,
  ): Promise<Candidate | null>;

  /**
   * Create a new candidate
   */
  create(candidate: Partial<Candidate>): Promise<Candidate>;

  /**
   * Update an existing candidate
   */
  update(id: string, data: Partial<Candidate>): Promise<Candidate>;

  /**
   * Delete a candidate
   */
  delete(id: string, organizationId: string): Promise<void>;

  /**
   * Count candidates in an organization
   */
  count(organizationId: string): Promise<number>;
}

export const CANDIDATE_REPOSITORY = Symbol('CANDIDATE_REPOSITORY');

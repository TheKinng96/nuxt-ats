# TODO - ATS Backend (NestJS + Clean Architecture)

> **Project Pivot:** This repo is now the **ATS Backend** (NestJS + PostgreSQL + Clean Architecture)
> The frontend ATS module will be built separately in the Chokusai FE repo.

---

## 🎯 Project Overview

### Architecture
- **Backend Framework**: NestJS (Clean Architecture)
- **Database**: PostgreSQL (Docker)
- **ORM**: Prisma
- **Authentication**: JWT validation (shared secret with Chokusai BE - **no auth logic here**)
- **Multi-tenancy**: All data scoped by `organizationId`

### Core Features (5)
1. 応募者の管理画面 (Applicants management)
2. 応募経路管理 (Application route tracking)
3. 面接日程管理 (Interview scheduling)
4. 候補者単位の詳細画面 (Candidate details)
5. 候補者の進捗管理 (Candidate progress/pipeline)

---

## 🚀 Sprint 1: Backend Foundation (Current Sprint)

### Phase 1.1: Repository Restructure
- [ ] Remove `apps/web/` (Nuxt application)
- [ ] Update root `package.json` scripts
- [ ] Update `pnpm-workspace.yaml`
- [ ] Clean up unused dependencies
- [ ] Archive old README sections (keep relevant parts)

### Phase 1.2: NestJS Setup
- [ ] Run `npx @nestjs/cli new packages/api` (choose pnpm)
- [ ] Install additional dependencies
  - [ ] @nestjs/jwt, @nestjs/config
  - [ ] jsonwebtoken, @types/jsonwebtoken
  - [ ] class-validator, class-transformer
- [ ] Configure TypeScript paths in `tsconfig.json`
- [ ] Set up ESLint/Prettier for NestJS

### Phase 1.3: Docker + PostgreSQL
- [ ] Create `docker-compose.yml` in root
- [ ] Configure PostgreSQL service
- [ ] Add volume for data persistence
- [ ] Create `.env.example` with required variables
- [ ] Test Docker setup (`docker-compose up`)

### Phase 1.4: Prisma Migration
- [ ] Update `packages/database/prisma/schema.prisma`
  - [ ] Change datasource to PostgreSQL
  - [ ] Add `organizationId` to all models
  - [ ] Add proper indexes for multi-tenancy
  - [ ] Update Candidate model fields
- [ ] Generate migration: `pnpm db:migrate`
- [ ] Test Prisma connection
- [ ] Generate Prisma client

### Phase 1.5: Clean Architecture Structure
- [ ] Create folder structure in `packages/api/src/`:
  - [ ] `common/` - Guards, decorators, filters
  - [ ] `domain/` - Entities and repository interfaces
  - [ ] `application/` - Use cases and DTOs
  - [ ] `infrastructure/` - Database and HTTP controllers
  - [ ] `modules/` - NestJS modules
- [ ] Move generated files into Clean Architecture structure

### Phase 1.6: JWT Authentication (Self-Contained)
- [ ] Create `JwtAuthGuard` in `common/guards/`
- [ ] Implement token validation (using shared JWT_SECRET)
- [ ] Create `@CurrentUser()` decorator
- [ ] Extract userId, orgId, email, permissions from token
- [ ] Add error handling for invalid tokens
- [ ] Test with sample JWT token

### Phase 1.7: Multi-Tenancy Setup
- [ ] Create Prisma middleware for orgId filtering
- [ ] Test that queries are auto-scoped
- [ ] Add orgId validation in guards
- [ ] Prevent cross-organization data access

### Phase 1.8: Candidates Module (Proof of Concept)
- [ ] Create domain layer
  - [ ] `domain/candidates/entities/candidate.entity.ts`
  - [ ] `domain/candidates/repositories/candidate.repository.interface.ts`
- [ ] Create application layer
  - [ ] `application/candidates/dto/create-candidate.dto.ts`
  - [ ] `application/candidates/dto/update-candidate.dto.ts`
  - [ ] `application/candidates/dto/candidate-response.dto.ts`
  - [ ] `application/candidates/use-cases/list-candidates.use-case.ts`
  - [ ] `application/candidates/use-cases/create-candidate.use-case.ts`
  - [ ] `application/candidates/use-cases/update-candidate.use-case.ts`
  - [ ] `application/candidates/use-cases/get-candidate.use-case.ts`
  - [ ] `application/candidates/use-cases/delete-candidate.use-case.ts`
- [ ] Create infrastructure layer
  - [ ] `infrastructure/database/prisma.service.ts`
  - [ ] `infrastructure/database/prisma.module.ts`
  - [ ] `infrastructure/database/repositories/prisma-candidate.repository.ts`
  - [ ] `infrastructure/http/candidates/candidates.controller.ts`
- [ ] Create NestJS module
  - [ ] `modules/candidates/candidates.module.ts`
- [ ] Wire everything together in `app.module.ts`
- [ ] Test all CRUD operations with Postman/Thunder Client

### Phase 1.9: Testing & Documentation
- [ ] Test JWT authentication flow
- [ ] Test multi-tenancy (different orgIds)
- [ ] Test all Candidates endpoints
- [ ] Document API endpoints (README or Swagger)
- [ ] Update ARCHITECTURE.md with new structure

---

## 📋 Sprint 2: Remaining Features

### Phase 2.1: Application Routes Module
- [ ] Create domain entities and interfaces
- [ ] Create application DTOs and use cases
- [ ] Create infrastructure (repository + controller)
- [ ] Create NestJS module
- [ ] Test endpoints

### Phase 2.2: Interviews Module
- [ ] Create domain entities and interfaces
- [ ] Create application DTOs and use cases
- [ ] Create infrastructure (repository + controller)
- [ ] Create NestJS module
- [ ] Add calendar/scheduling logic
- [ ] Test endpoints

### Phase 2.3: Candidate Details Enhancement
- [ ] Add related data fetching (interviews, applications, etc.)
- [ ] Add activity log tracking
- [ ] Add comments/notes support
- [ ] Enhance candidate response DTO
- [ ] Test endpoints

### Phase 2.4: Candidate Progress/Pipeline Module
- [ ] Create Stage entity and repository
- [ ] Create StageHistory entity
- [ ] Add stage transition logic
- [ ] Add progress tracking
- [ ] Add time-in-stage calculations
- [ ] Test endpoints

---

## 📋 Sprint 3: Polish & Integration

### Phase 3.1: Error Handling
- [ ] Create global exception filter
- [ ] Add validation pipes
- [ ] Standardize error responses
- [ ] Add logging system (Winston/Pino)

### Phase 3.2: API Documentation
- [ ] Install @nestjs/swagger
- [ ] Add Swagger decorators to controllers
- [ ] Add DTO documentation
- [ ] Generate OpenAPI spec
- [ ] Test Swagger UI

### Phase 3.3: Testing
- [ ] Write unit tests for use cases
- [ ] Write integration tests for repositories
- [ ] Write E2E tests for controllers
- [ ] Set up CI pipeline (optional)

### Phase 3.4: Performance
- [ ] Add database indexes
- [ ] Implement pagination
- [ ] Add caching where appropriate
- [ ] Optimize N+1 queries

### Phase 3.5: Documentation Updates
- [ ] Update README.md with setup instructions
- [ ] Update ARCHITECTURE.md with diagrams
- [ ] Create EXTRACTION-GUIDE.md for future monorepo
- [ ] Document environment variables
- [ ] Document API endpoints

---

## 🔧 Technical Debt

- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Add health check endpoint
- [ ] Add metrics/monitoring
- [ ] Add Docker build for API
- [ ] Set up production environment config
- [ ] Security audit
- [ ] Performance profiling

---

## 📝 Documentation Checklist

- [ ] README.md (setup, Docker, API overview)
- [ ] ARCHITECTURE.md (Clean Architecture, diagrams)
- [ ] EXTRACTION-GUIDE.md (how to move to monorepo later)
- [ ] API.md (endpoint documentation)
- [ ] .env.example (all required variables)
- [ ] docker-compose.yml (commented)
- [ ] Update CLAUDE.md (remove Nuxt references, add NestJS)

---

## 🎯 Success Criteria

### Sprint 1 Complete When:
- ✅ NestJS API running on port 3001
- ✅ PostgreSQL in Docker working
- ✅ JWT validation working (shared secret)
- ✅ Multi-tenancy working (orgId filtering)
- ✅ Candidates CRUD working end-to-end
- ✅ Clean Architecture structure in place
- ✅ Basic documentation complete

### Sprint 2 Complete When:
- ✅ All 5 features implemented
- ✅ All endpoints tested
- ✅ API documented

### Sprint 3 Complete When:
- ✅ Error handling solid
- ✅ Tests written
- ✅ Performance optimized
- ✅ Full documentation
- ✅ Ready for frontend integration

---

## 🔗 Related Work

### Frontend (Chokusai FE Repo)
The ATS frontend module is being built in `/Users/gen/corekara/chokusai-frontend`
- See Chokusai FE repo for frontend TODO
- Frontend will use Shadcn Vue (isolated to ATS module)
- Frontend will use existing Chokusai auth (shared JWT)

---

**Last Updated:** 2025-10-10 (Project restructure to NestJS backend)

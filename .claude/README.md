# .claude Directory

This directory contains planning, documentation, and guidance files for working on this project.

## Files

### 📋 TODO.md
**Current sprint tasks and active development items**
- High priority tasks
- In-progress features
- Development backlog organized by phase
- Bug tracking
- Technical debt items

**Update this file:**
- When starting a new task (move to "In Progress")
- When completing a task (mark with `[x]`)
- When discovering new tasks
- During sprint planning

---

### 🗺️ ROADMAP.md
**Long-term vision and feature roadmap**
- Product vision and goals
- Release timeline (v0.1 → v1.0 → v2.0+)
- Feature phases with success criteria
- Future integrations and enterprise features
- Technology roadmap
- Success metrics and market positioning

**Update this file:**
- When planning new major features
- During product strategy discussions
- When adjusting release timeline
- When defining new version goals

---

### 🏗️ ARCHITECTURE.md
**Technical architecture and system design**
- Technology stack details
- Monorepo structure
- Core features overview
- Database schema (high-level)
- API structure
- State management approach
- Security considerations
- AI integration strategy

**Update this file:**
- When making architectural decisions
- When adding new technologies
- When changing system design
- When documenting technical patterns

---

### 🤖 CLAUDE.md
**Repository working structure for Claude Code**
- Project structure explanation
- Task management workflow
- Development guidelines
- File organization rules
- Naming conventions
- Common commands
- Code style preferences
- Debugging tips

**Update this file:**
- When establishing new conventions
- When changing project structure
- When adding new development workflows
- When documenting common issues

---

## Why `.claude` directory?

1. **Organized Planning**: Keep all planning docs in one place
2. **Clean Root**: Main README stays focused on setup and overview
3. **Version Controlled**: Planning docs tracked alongside code
4. **AI-Friendly**: Claude Code can reference these files for context
5. **Team Alignment**: Everyone sees the same roadmap and todos

## Workflow

### For Developers
1. Check **TODO.md** for current tasks
2. Read **CLAUDE.md** for working structure
3. Reference **ARCHITECTURE.md** for technical decisions
4. Update **TODO.md** as you work

### For Product Planning
1. Update **ROADMAP.md** with new features
2. Break down roadmap items into **TODO.md** tasks
3. Document decisions in **ARCHITECTURE.md**

### For Claude Code
1. Start by reading **CLAUDE.md** for context
2. Check **TODO.md** for current priorities
3. Reference **ARCHITECTURE.md** for technical guidance
4. Update **TODO.md** when completing tasks

## Git Strategy

These files are **version controlled** by default. If you prefer to keep planning private, uncomment the `.claude/` line in `.gitignore`.

---

**Last Updated:** 2025-10-03

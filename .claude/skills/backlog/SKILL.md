---
name: backlog
description: 'Implement a backlog item end-to-end: plan, branch, code, test, PR. Use when the user provides a backlog item number (e.g., 1, 7) to implement from docs/backlog.md.'
argument-hint: '[ITEM-NUMBER]'
disable-model-invocation: false
---

Implement backlog item `$ARGUMENTS` from `docs/backlog.md`.

## Workflow

### Phase 1: Understand

1. Read `docs/backlog.md` and find the section matching item `$ARGUMENTS`.
2. If not found, tell the user and stop.
3. Read `docs/erd.md` to understand the data model.
4. Read existing source files relevant to the ticket (check `src/`, `Controllers/`, `Models/`, `Services/`, `Data/`, etc.).
5. Check existing code for patterns and conventions.

### Phase 2: Plan

6. Enter plan mode. Write a concise implementation plan covering:
   - What changes are needed and where
   - New files to create (if any)
   - Test cases to add (if applicable)
7. Present the plan for lead agent approval. Do not proceed until approved.

### Phase 3: Implement

8. Create branch: `feat/backlog-$ARGUMENTS` (e.g., `feat/backlog-3`) from `main`.
9. For tickets that have testable behavior:
   - **RED** — Write tests first. Use xUnit + Moq (or NSubstitute).
   - Run `dotnet test` — verify new tests **fail**.
   - **GREEN** — Write minimal implementation to make tests pass.
   - **REFACTOR** — Clean up while keeping tests green.
10. For infrastructure/config tickets (scaffolding, schema): implement directly, verify with build/run.
11. Run `dotnet build` — fix any errors.
12. Run `dotnet test` (if tests exist) — verify all tests pass.

### Phase 4: Review

13. Send a message to the team lead summarizing what was done and any decisions made.
14. Apply requested changes, re-run build and tests.
15. Repeat until the lead agent is satisfied.

### Phase 5: Ship

16. Commit all changes on the feature branch (do NOT include `.claude/` memory files).
17. Report completion to the team lead with a summary of what was done and any decisions made.

**Important — agents must NOT:**

- Edit `docs/backlog.md` (the lead agent updates ticket statuses after merge)
- Merge into `main` or push to remote (the lead agent handles all merges)
- Edit files under `.claude/` (skills, memory, settings)

## Rules

- Keep changes minimal — only what the backlog item requires.
- Use `dotnet` CLI as the build/test/run tool.
- Follow existing code patterns and project conventions.
- Use EF Core with PostgreSQL for data access.
- Use ASP.NET Core minimal APIs or controllers — follow whatever pattern is already established.
- Never log PII (emails, tokens, etc.).
- Follow the ERD in `docs/erd.md` — do not invent new tables without discussion.

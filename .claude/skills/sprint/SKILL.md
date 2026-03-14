---
name: sprint
description: 'Run a sprint: pick up to 5 backlog items, spawn a team of agents to implement them in parallel using git worktrees.'
disable-model-invocation: false
---

Run a sprint by selecting up to 5 backlog items and implementing them in parallel with a team of agents.

## Workflow

### Phase 1: Select Sprint Items

1. Read `docs/backlog.md`.
2. Collect all items that are not yet completed.
3. Sort by dependency order (items with fewer blockers first).
4. Skip items whose dependencies are not yet done.
5. Select the top 5 eligible items (or fewer if less than 5 are available).
6. Present the selected items to the user and ask for confirmation before proceeding.

### Phase 2: Create Team

7. Use `TeamCreate` to create a team named `sprint`.
8. For each selected backlog item, create a task with `TaskCreate`:
   - Subject: the ticket ID and title (e.g., `HMP-003: Auth (Sign in with Apple / Google)`)
   - Description: include the ticket ID, full description from the backlog, and instructions to use the `/backlog` skill.
   - ActiveForm: `Implementing HMP-XXX`

### Phase 3: Spawn Agents

9. For each task, spawn a teammate agent using the `Task` tool with:
   - `subagent_type`: `general-purpose`
   - `team_name`: `sprint`
   - `name`: the ticket ID in lowercase (e.g., `hmp-003`)
   - `mode`: `bypassPermissions`
   - Prompt that tells the agent to:
     a. Create a git worktree: `git worktree add ../holdmyphone-HMP-XXX -b feat/HMP-XXX main`
     b. Change working directory to the worktree: `cd ../holdmyphone-HMP-XXX`
     c. Use the `/backlog HMP-XXX` skill to implement the ticket end-to-end.
     d. When done, mark the task as completed.
     e. **Do NOT merge into main** — the team lead will handle merges after review.
     f. **Do NOT edit `docs/backlog.md`** — the team lead will update ticket statuses.
     g. **Do NOT edit files under `.claude/`** — these are lead-only.

10. Spawn all agents in parallel (multiple `Task` tool calls in one message).

### Phase 4: Coordinate

11. As agents report back, review their work:
    - Check that builds pass (`dotnet build`)
    - Check that tests pass (`dotnet test`)
    - Verify the backlog item requirements are met
12. If changes are needed, send feedback via `SendMessage` and let the agent iterate.
13. When an agent's work is approved:
    - Merge the worktree branch into `main`: `git checkout main && git merge feat/HMP-XXX`
    - Remove the worktree: `git worktree remove ../holdmyphone-HMP-XXX`
14. After all items are merged, push to remote: `git push origin main`.
15. Clean up the team with `TeamDelete`.

## Rules

- Never select more than 5 items per sprint.
- Always use git worktrees (`../holdmyphone-HMP-XXX`) — never work directly on `main`.
- Merge one branch at a time to avoid conflicts.
- If a merge conflict occurs, resolve it before merging the next branch.
- Stash any local changes on `main` before starting.
- **Only the lead agent** edits `docs/backlog.md` and `.claude/` files.

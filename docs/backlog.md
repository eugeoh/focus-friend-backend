# HoldMyPhone — Backend Backlog

Tech stack: **C# / .NET**, backed by the ERD in `erd.md`.

All issues below are P0 (MVP). Ordered by dependency — earlier items unblock later ones.

| Ticket | Title | GitHub | Blocked by | Status |
|---|---|---|---|---|
| HMP-001 | Project scaffolding | [#1](https://github.com/eugeoh/focus-friend-backend/issues/1) | — | backlog |
| HMP-002 | Database schema & migrations | [#2](https://github.com/eugeoh/focus-friend-backend/issues/2) | HMP-001 | backlog |
| HMP-003 | Auth (Sign in with Apple / Google) | [#3](https://github.com/eugeoh/focus-friend-backend/issues/3) | HMP-001, HMP-002 | backlog |
| HMP-004 | Users API | [#4](https://github.com/eugeoh/focus-friend-backend/issues/4) | HMP-003 | backlog |
| HMP-005 | Pairing API | [#5](https://github.com/eugeoh/focus-friend-backend/issues/5) | HMP-003, HMP-004 | backlog |
| HMP-006 | Locked apps API | [#6](https://github.com/eugeoh/focus-friend-backend/issues/6) | HMP-005 | backlog |
| HMP-007 | Access request API | [#7](https://github.com/eugeoh/focus-friend-backend/issues/7) | HMP-005, HMP-006 | backlog |
| HMP-008 | Daily password endpoint | [#8](https://github.com/eugeoh/focus-friend-backend/issues/8) | HMP-005 | backlog |
| HMP-009 | Push notifications | [#9](https://github.com/eugeoh/focus-friend-backend/issues/9) | HMP-004, HMP-007 | backlog |
| HMP-010 | Time expiry handling | [#10](https://github.com/eugeoh/focus-friend-backend/issues/10) | HMP-007 | backlog |

---

## HMP-001: Project scaffolding

Set up the C# .NET Web API project with folder structure, dependency injection, and configuration.

- [ ] Initialize .NET Web API project
- [ ] Add NuGet packages (EF Core, auth, push notification client)
- [ ] Set up environment-based configuration (appsettings.json / env vars)
- [ ] Add .gitignore, editorconfig
- [ ] Basic health check endpoint (`GET /health`)

**Blocked by:** nothing
**Unblocks:** everything else

---

## HMP-002: Database schema & migrations

Create EF Core DbContext and migrations for the 4 ERD tables: `users`, `pairs`, `locked_apps`, `access_requests`.

- [ ] Define entity models matching ERD
- [ ] Configure relationships (users → pairs, pairs → locked_apps, pairs → access_requests)
- [ ] Add indexes (email unique, pair_id on locked_apps and access_requests)
- [ ] Initial migration
- [ ] Seed script for local dev

**Blocked by:** HMP-001
**Unblocks:** all API work

---

## HMP-003: Auth (Sign in with Apple / Google)

Validate external identity tokens and issue JWTs. Create user row on first login.

- [ ] Endpoint: `POST /auth/apple` — validate Apple identity token, return JWT
- [ ] Endpoint: `POST /auth/google` — validate Google identity token, return JWT
- [ ] JWT middleware for protected routes
- [ ] Auto-create user row on first sign-in (upsert by email)

**Blocked by:** HMP-001, HMP-002

---

## HMP-004: Users API

Manage user profile and push token registration.

- [ ] `GET /users/me` — return current user profile
- [ ] `PUT /users/me` — update name
- [ ] `PUT /users/me/push-token` — register/update APNs or FCM push token
- [ ] `DELETE /users/me` — account deletion (GDPR)

**Blocked by:** HMP-003

---

## HMP-005: Pairing API

Create, accept, and dissolve pairs between users.

- [ ] `POST /pairs/invite` — generate invite code/link, create pair with status `pending`
- [ ] `POST /pairs/accept` — accept invite code, set pair status to `active`
- [ ] `GET /pairs/me` — list current user's active pairs (as user or keeper)
- [ ] `DELETE /pairs/:id` — dissolve pair (set status to `dissolved`)
- [ ] Validate: one active pair per user-keeper direction (prevent duplicates)

**Blocked by:** HMP-003, HMP-004

---

## HMP-006: Locked apps API

CRUD for the apps a user wants locked within a pair.

- [ ] `GET /pairs/:id/apps` — list locked apps for a pair
- [ ] `PUT /pairs/:id/apps` — bulk set locked apps (replace all)
- [ ] Only the user (not keeper) in the pair can edit the locked apps list
- [ ] Validate pair is active

**Blocked by:** HMP-005

---

## HMP-007: Access request API

The core loop: request, approve, deny/jail.

- [ ] `POST /pairs/:id/requests` — user creates access request (status: `pending`)
- [ ] Validate: no existing `pending` request for this pair
- [ ] Validate: user is not in jail (`jail_until` not in future)
- [ ] `PUT /requests/:id/approve` — keeper approves, sets `granted_minutes` and `resolved_at`
- [ ] `PUT /requests/:id/deny` — keeper denies, sets `jail_until` and `resolved_at`
- [ ] `GET /pairs/:id/requests/active` — get current active/pending request and time remaining
- [ ] `GET /pairs/:id/status` — combined status: locked/unlocked, time remaining, jail remaining

**Blocked by:** HMP-005, HMP-006

---

## HMP-008: Daily password endpoint

Compute and return the daily password for the Time Keeper.

- [ ] `GET /pairs/:id/daily-password` — returns today's password (keeper only)
- [ ] `POST /pairs/:id/daily-password/verify` — user submits password, returns unlock if correct
- [ ] HMAC-based generation: `HMAC(secret, pair_id + date)` → word + number
- [ ] On successful verify, create an approved access_request row (audit trail)

**Blocked by:** HMP-005

---

## HMP-009: Push notifications

Send push notifications for request lifecycle events.

- [ ] Integrate APNs (iOS) and FCM (Android) clients
- [ ] Trigger on: request created → notify keeper
- [ ] Trigger on: request approved → notify user
- [ ] Trigger on: request denied (jail) → notify user
- [ ] Trigger on: time expired → notify user (compute from `created_at + granted_minutes`)
- [ ] Graceful handling of invalid/expired push tokens

**Blocked by:** HMP-004, HMP-007

---

## HMP-010: Time expiry handling

Handle unlock expiration without a background job (keep it cheap).

- [ ] Status endpoint computes time remaining on the fly: `created_at + granted_minutes - now`
- [ ] Client polls or uses local timer based on granted duration
- [ ] If a new request comes in and previous grant has expired, allow it
- [ ] No cron jobs, no background workers — pure computation at request time

**Blocked by:** HMP-007

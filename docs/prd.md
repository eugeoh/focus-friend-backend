# HoldMyPhone — Product Requirements Document

## 1. Vision

HoldMyPhone is the accountability app for people who know they have zero self-control — and are honest enough to admit it. You pick a friend, partner, or anyone you trust (or fear), hand them the keys to your most distracting apps, and now *they* decide if you get your daily dose of doomscrolling. It's Screen Time, except it actually works because there's a real human judging you.

The whole thing is built on one insight: you'll lie to an app, but you won't lie to your best friend's face when they ask "do you *really* need TikTok right now?"

## 2. Problem

People aged 18–35 spend 3-5 hours a day on social media and entertainment apps. Most of them know it's too much. The existing solutions are all some flavor of broken:

- **Self-control apps** (Forest, one sec, etc.) — you set your own limits, which means you also remove your own limits. It's like being your own parole officer.
- **Built-in screen time tools** (iOS Screen Time, Android Digital Wellbeing) — "Ignore Limit" is right there. One tap. Every time. It's a speed bump, not a wall.
- **Cold turkey blockers** — too rigid, no nuance. Sometimes you genuinely need to check something. These don't care.

None of these use the strongest motivator humans have: **not wanting to look like a clown in front of someone they respect.** HoldMyPhone puts a real person between you and your worst habits. Your Time Keeper gets to approve, deny, or straight-up send you to jail. Social pressure is the feature.

## 3. Target Customer

### Primary: Gen Z & Millennials (18–35)

- Chronically online. Self-aware about it. Meme-literate.
- Have tried Screen Time limits and disabled them within 48 hours.
- Want to "lock in" for productivity, studying, gym, creative work — but keep falling back into the scroll.
- Will use the app if it's funny and social, not if it feels like a wellness lecture.

### Who pairs with whom

- **Friends** — "I'll be your Time Keeper if you'll be mine." Mutual accountability.
- **Couples** — "Babe, you've been on Instagram for two hours." Now there's an app for that.
- **Roommates / study partners** — Exam season. Library. Lock in.
- **Anyone with a group chat and a shared problem.**

### Future expansion: Parents & teens

The core mechanic (one person holds the keys, the other asks nicely) maps directly to a parental-control use case. Once the product is proven with the peer audience, a "Family Mode" with age-appropriate tone, COPPA compliance, and parental-control-specific features (scheduled bedtime locks, school-hours blocking) is a natural expansion. Deliberately out of scope for v1 — the brand needs to land with the fun audience first before going wholesome.

### What they're NOT (today)

- Not looking for parental controls (yet). Not looking for corporate productivity software. Not looking for a therapist in their pocket. They want a friend with power.

## 4. Branding & Tone

| Element | Direction |
|---|---|
| **Name** | HoldMyPhone |
| **Tagline options** | "Lock in or get locked out." / "Your friend with benefits (the benefit is discipline)." |
| **Visual identity** | Dark mode only. Deep indigo-to-purple gradient. Lime-green (#84cc16) for positive actions. Rounded, soft UI. Feels like a premium app that doesn't take itself too seriously. |
| **Tone of voice** | Unhinged but affectionate. The app talks to you like your funniest group chat friend. Examples: *"they say they need it... do they tho?"* / *"the tiktoks will still be there later. go touch grass"* / *"make them work for it. build character or whatever the boomers say"* / *"You're in jail! Time to reflect on your choices."* |
| **Emoji-first** | Icons are emojis, not corporate SVGs. Lock, key, cop for jail, grass for touching grass. |
| **Time Keeper experience** | Yellow/orange accent. They're the gatekeeper. The vibe is "benevolent dictator." |
| **User experience** | Lime-green accent. The vibe is "humble petitioner at the gates." |

The brand should feel like something people screenshot and post on their stories. If the copy isn't funny enough to share, it's not funny enough.

## 5. Core User Flows

### 5.1 Onboarding & Pairing

1. User signs up (email, Apple ID, or Google).
2. User invites a friend via share link / text / QR code. Copy: *"I need an adult. Be my Time Keeper?"*
3. Friend downloads, signs up, accepts the invite.
4. User selects which apps to lock from their installed apps.
5. Both land on their home screens. The bit begins.

Either person can be a Time Keeper AND a user simultaneously (mutual accountability). Pairing is bidirectional if both want it.

### 5.2 User Requests Access

1. Locked apps are blocked by default. They show as greyed-out with a lock badge.
2. User taps **"Request Access"** — sends a push notification to their Time Keeper.
3. One request at a time. Button changes to **"Request Pending..."** — no spam.
4. If time is already active, a big countdown timer shows remaining minutes. Copy: *"make it count"*
5. When time hits zero, apps re-lock. Toast: *"Time's up! Apps locked again. Ask your Time Keeper for more time."*

### 5.3 Time Keeper Approves or Jails

**Approve:**
- Time Keeper gets the request notification.
- Opens the app, sees the request card: *"they say they need it... do they tho?"*
- Taps **"Approve"** — unlocks all locked apps for a set duration (default: 30 min).
- Can also proactively tap **"Unlock Apps"** without waiting for a request.

**Send to Jail:**
- Time Keeper taps **"Send to Jail"** — request denied.
- User enters a cooldown (default: 10 min) where they can't send new requests.
- User sees the jail screen: cop emoji, countdown timer, *"Your Time Keeper denied your request. Time to reflect on your choices."*

### 5.4 Daily Password (Backdoor)

- A new password auto-generates at midnight (e.g., "VIBE42", "CHILL07").
- Only the Time Keeper can see it (tap to reveal).
- The Time Keeper can share it verbally, over text, whenever they decide to.
- User enters it to self-unlock — for when the Time Keeper is asleep, busy, or just not responding.

## 6. Key Features & Prioritization

### P0 — MVP (ships first or doesn't ship at all)

| Feature | Description |
|---|---|
| **Accounts & pairing** | Sign up and link with a friend via invite code/link. |
| **Custom app selection** | User picks which installed apps to lock. Enforced at OS level (iOS Screen Time API / Android UsageStats). |
| **Request / Approve / Jail** | The core loop. Push notifications on both sides. |
| **Time-limited unlock** | Apps unlock for N minutes, then auto-lock. |
| **Jail cooldown** | Denied = locked out of requesting for a set period. |
| **Daily password** | Auto-generated daily bypass visible only to Time Keeper. |

### P1 — Fast Follow

| Feature | Description |
|---|---|
| **Stats dashboard** | Time Keeper sees: streak (consecutive days under target), time saved, screen-time trend (e.g., -32%). |
| **Configurable time grants** | Time Keeper picks duration: 15 / 30 / 60 / custom minutes. |
| **Configurable jail duration** | Time Keeper sets how long the cooldown lasts. |
| **Mutual mode** | Both users are each other's Time Keeper. Symmetric pairing. |
| **Notification tuning** | Quiet hours, snooze, frequency caps. |

### P2 — Growth & Retention

| Feature | Description |
|---|---|
| **Multiple Time Keepers** | More than one friend can hold your apps hostage. |
| **Scheduled free time** | Recurring unlock windows (e.g., "Saturdays 2-6 PM, go wild"). |
| **Weekly roast report** | Summary of the week's stats, sent with personality. *"You asked for TikTok 14 times this week. Seek help."* |
| **Achievements** | Badges and streaks for the user. Reduced jail time after good behavior. Flex-worthy. |
| **Per-app unlocking** | Unlock Instagram but not TikTok. Granular control. |
| **Group mode** | A whole friend group locks in together. Leaderboard of who has the most discipline. |

## 7. Monetization

**Model:** Free 1-month trial with full access, then paid subscription.

| | Details |
|---|---|
| **Trial** | 30 days, all features unlocked, no credit card required. Long enough to build a streak and get hooked. |
| **Solo subscription** | Monthly or annual. Full price. For one user. |
| **Buddy deal** | If two people sign up together (via the same invite link), both get a discounted rate. Rewards the exact behavior the product depends on — bringing a friend. |

Pricing TBD. The buddy discount should feel meaningful enough that solo feels like the wrong choice.

## 8. Platform Strategy

| Phase | Platform | Approach |
|---|---|---|
| **Phase 1** | iOS | Native Swift. Screen Time API for app blocking. |
| **Phase 2** | Android | Native Kotlin. UsageStatsManager + accessibility services. |

Separate repos per platform. This repo (`focus-friend-backend`) is the shared backend: auth, pairing, request/response, push notifications, stats, password generation.

## 9. Success Metrics

| Metric | Target | Why |
|---|---|---|
| **Pair completion rate** | > 70% of sign-ups | If people can't get a friend on board, nothing works. |
| **Daily active pairs** | Week-over-week growth | Core engagement. |
| **Request-to-response time** | < 5 min median | The loop dies if Time Keepers ghost. |
| **7-day retention** | > 40% | People keep the app instead of deleting it out of spite. |
| **Screen time reduction** | > 20% avg after 2 weeks | The whole point. |
| **Shareability** | Track screenshot / share events | If people aren't posting their jail screens, the tone isn't landing. |
| **Free-to-Pro conversion** | > 5% | Money. |

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| **Users uninstall** | Detect uninstall, notify Time Keeper. Make the app fun enough that removing it feels like quitting. Streaks create sunk-cost motivation. |
| **OS blocking limitations** | Screen Time API (iOS) and UsageStats (Android) have guardrails. Research early. May need MDM profiles or alternative enforcement on iOS. |
| **Time Keeper fatigue** | If requests are constant, Time Keepers will stop responding. Daily password is the pressure valve. Scheduled free time (P2) fixes this structurally. |
| **Privacy** | Store minimal data. No browsing history, no app usage details beyond what's needed. Be transparent. GDPR-compliant from day one — the audience is global. |
| **People try to game it** | They will. Defense-in-depth: OS enforcement, uninstall detection, password rotation. Perfect enforcement isn't the goal — raising the friction is. If it's easier to just go do the thing you're supposed to do, the app wins. |
| **Relationship dynamics** | A Time Keeper shouldn't become a controlling figure. Add mutual mode and make it easy to unpair. The app is opt-in, always. |

## 11. Open Questions

- What is the minimum iOS version to support? (Screen Time API requires iOS 15+.)
- Should the daily password grant a fixed time window or unlimited access for the day?
- How should the app handle a user with multiple devices?
- Should users be able to "earn" automatic free time by maintaining streaks?
- What's the right default jail duration? 10 min from the mock — too harsh? Too soft?
- Should the Time Keeper be able to see *which* apps the user is requesting for, or just "they want access"?

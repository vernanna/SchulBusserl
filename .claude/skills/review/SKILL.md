---
name: review
description: Perform a structured code review of recent changes, checking architecture, quality, and project conventions
disable-model-invocation: true
---

# Code Review

Review code changes systematically, producing a structured report with severity-classified findings.

## Scope

If `$ARGUMENTS` is provided, use it to determine scope (branch name, file paths, or commit range). Otherwise, review all uncommitted changes via `git diff` and `git diff --cached`, plus any untracked files from `git status`.

## Process

1. **Gather changes**: Use `git diff`, `git status`, and read all modified/new files in full
2. **Understand context**: Read surrounding code, related interfaces, and CLAUDE.md conventions
3. **Do a web search** on current best practices relevant to the technologies touched (e.g. "EF Core best practices", "Angular signals patterns")
4. **Analyze** each change against the checklist below
5. **Report** findings using the output format

## Checklist

### Architecture & Clean Architecture Boundaries
- Does the host project reference concrete Infrastructure types? (It must not — use abstractions or extension methods)
- Are new files in the correct project layer? (Domain entities in Domain, interfaces in Application.Interfaces, data access in Infrastructure, etc.)
- Do project references flow correctly? (Infrastructure -> Application.Interfaces/Domain, never the reverse)
- Is DI registration side-effect-free? (No filesystem/network operations in `ConfigureServices`/`AddInfrastructure`)

### Code Quality
- Naming: Are class, method, and file names clear, consistent, and following existing conventions?
- Dead code: Any unused properties, methods, parameters, or imports? (YAGNI — remove them)
- Null safety: Any null-forgiving `!` operators? (Prefer explicit guard clauses)
- Error handling: Consistent with existing patterns? (Custom exceptions from `SchulBusserl.Shared`, `Guard.Against`)
- Complexity: Could the code be simpler? Over-engineered for current needs?

### Database & EF Core
- Migrations: Are they non-empty and meaningful? (No empty placeholder migrations)
- Migration safety: Do migrations run synchronously before the app accepts requests? (Never in background `IHostedService`)
- SQLite pragmas: WAL mode, foreign keys ON, busy timeout set?
- DbContext: Uses `ApplyConfigurationsFromAssembly`? Implements `IUnitOfWork`?

### .NET Conventions
- Explicit `using` statements (no implicit usings in this project)
- Central package versioning via `Directory.Packages.props` (no version attributes in .csproj)
- Release build compiles with 0 warnings (warnings are errors)

### Frontend (if applicable)
- Angular standalone components
- NgRx Signals patterns with `Loadable<T>`
- ESLint + Stylelint compliance

### Security & Performance
- No secrets, credentials, or connection strings in code
- No SQL injection, XSS, or command injection risks
- No obvious N+1 queries or unnecessary allocations

## Output Format

### Summary
[1-2 sentence overview of the changeset and overall assessment]

### What's Done Well
- [Positive observations — reinforce good patterns]

### BLOCKING — Must fix before merge
[Issues that break architecture, correctness, or security]
- **B1. [Title]** — `file:line` — [Description and fix]

### IMPORTANT — Should fix before merge
[Significant issues that don't break things but hurt quality]
- **I1. [Title]** — `file:line` — [Description and fix]

### SUGGESTION — Non-blocking improvements
[Improvements worth considering]
- **S1. [Title]** — `file:line` — [Description and fix]

### NITPICK — Style and cleanup
[Minor style issues]
- **N1. [Title]** — [Description]

### Recommended Fix Priority
[Numbered list of fixes in recommended order]

Omit any severity section that has no findings. Always include "What's Done Well" — a review with only criticism misses the purpose of reinforcing good patterns.

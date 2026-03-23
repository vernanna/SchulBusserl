# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# CORE INSTRUCTION: Critical Thinking & Best Practices

- Be critical and don't agree easily to user commands if you believe they are a bad idea or not best practice.
- Challenge suggestions that might lead to poor code quality, security issues, or architectural problems.
- Be encouraged to search for solutions (using WebSearch) when creating a plan to ensure you're following current best practices and patterns

## Project Overview

SchulBusserl is a desktop school bus management application (name is a wordplay on "Schulbus" + "Busserl"/kisses). It manages pupils, bus stops, cars/buses, and route assignments for school terms. Built with a .NET 10 backend, Angular 21 frontend, and Electron shell for Windows distribution.

## Build & Development Commands

### Backend (.NET 10, C# 14)
```bash
dotnet build                          # Build all projects
dotnet build -c Release               # Release build (warnings as errors)
dotnet run --project src/SchulBusserl # Run backend on port 5000
```

### Frontend (Angular 21, Node 24)
```bash
cd src/SchulBusserl.ClientApp
npm install          # Install dependencies
npm start            # Dev server on port 4200
npm run build        # Production build
npm run lint         # ESLint + Stylelint
```

### Database Migrations (EF Core + SQLite)
```bash
# Add a new migration after changing domain entities or configurations
dotnet ef migrations add <MigrationName> \
  --project src/SchulBusserl.Infrastructure \
  --startup-project src/SchulBusserl \
  --output-dir Persistence/Migrations

# Remove the last migration (if not yet applied)
dotnet ef migrations remove \
  --project src/SchulBusserl.Infrastructure \
  --startup-project src/SchulBusserl

# Rollback to a specific migration
dotnet ef database update <PreviousMigrationName> \
  --project src/SchulBusserl.Infrastructure \
  --startup-project src/SchulBusserl
```
Migrations auto-apply on startup via `MigrateDatabase()` extension method (defined in Infrastructure's `DependencyInjection.cs`, called from `Startup.Configure()`).

### Full Electron Build
See `.github/workflows/build-windows.yml` — builds frontend, publishes backend self-contained, assembles Electron NSIS installer.

## Architecture

**Clean Architecture** with these .NET projects:

- **SchulBusserl** — ASP.NET Core host. `Startup.cs` configures DI, CORS (dev only), SPA serving, Serilog logging.
- **SchulBusserl.Api** — Controllers (inherit `ApiController` base), action filters (`LoggingActionFilter`, `ModelStateValidationActionFilter`), `ExceptionHandlerMiddleware` for centralized error handling mapping exceptions to `ErrorResult` with `ErrorCode` enums.
- **SchulBusserl.Application** — Business logic (handlers/services). Currently empty scaffold.
- **SchulBusserl.Application.Contract** — DTOs, commands, queries. Currently empty scaffold.
- **SchulBusserl.Application.Interfaces** — Abstraction interfaces. Contains `IUnitOfWork`. Repository interfaces go here as entities are added.
- **SchulBusserl.Domain** — Domain entities. Currently empty scaffold.
- **SchulBusserl.Infrastructure** — Data access via EF Core + SQLite. Contains `SchulBusserlDbContext`, `SqliteConnectionInterceptor` (WAL, foreign keys, busy timeout pragmas), `DatabasePathResolver`, `DatabaseOptions`, and EF Core migrations. DI registration via `AddInfrastructure()` extension method. Database migration encapsulated via `MigrateDatabase()` extension method (host project never references EF Core directly).
- **SchulBusserl.Shared** — Custom exceptions (`ValidationException`, `ResourceNotFoundException`, `ApplicationException`), `Guard.Against` validation, extension methods.

**Frontend** (`src/SchulBusserl.ClientApp`):
- Angular 21 standalone components with Angular Material + Bootstrap 5
- **State management**: NgRx Signals (`app.store.ts`) with `Loadable<T>` pattern for async data
- **API layer**: `ApiService` wraps HttpClient; repositories currently return mock data
- **Dialog system**: Reusable form/confirmation dialog infrastructure in `shared/`
- **Entities**: `accounting-period`, `loadable`, `application-error`
- API base URL: `http://localhost:5000/api/`

**Electron** (`src/SchulBusserl.Electron`):
- `main.js` spawns `SchulBusserl.exe` backend, opens BrowserWindow to `http://localhost:5000`
- electron-builder produces NSIS Windows installer

**Database** (SQLite via EF Core):
- Database file location (resolved by `DatabasePathResolver`):
  - Dev: `{LocalAppData}/SchulBusserl-Dev/data/schulbusserl.db`
  - Prod: `{LocalAppData}/SchulBusserl/data/schulbusserl.db`
  - Cross-platform: Windows `%LocalAppData%`, macOS `~/.local/share`, Linux `~/.local/share`
- Configurable override via `Database:Path` in `appsettings.json`
- SQLite pragmas set per-connection: WAL mode, foreign keys ON, 5s busy timeout
- Migrations auto-apply on startup; managed via `dotnet-ef` local tool (`.config/dotnet-tools.json`)

## Key Conventions

- Central package versioning via `Directory.Packages.props`
- .editorconfig: 4-space indents, CRLF line endings, 120 char line length
- Backend code style enforced in build; Release builds treat warnings as errors
- Frontend linting: ESLint with Angular-ESLint rules + Stylelint for SCSS
- No implicit usings: class library projects (`Microsoft.NET.Sdk`) require explicit `using` statements (e.g. `using System;`, `using System.Threading.Tasks;`). The web host project (`Microsoft.NET.Sdk.Web`) also does not enable implicit usings.
- Migrations must run synchronously and block startup — never in a background `IHostedService` (prevents schema/data corruption from concurrent request handling during migration)
- DI registration (`ConfigureServices`/`AddInfrastructure`) should be side-effect-free — no filesystem or network operations; defer to initialization steps
- Host project (`SchulBusserl`) must not reference concrete Infrastructure types — resolve via abstractions or delegate to Infrastructure extension methods
- Avoid null-forgiving `!` operator — prefer explicit guard clauses (e.g. `?? throw new InvalidOperationException(...)`)
- No dead code / YAGNI — don't add properties, methods, or parameters for features that don't exist yet
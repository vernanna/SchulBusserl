# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SchulBusserl is a desktop accounting application built with a .NET 10 backend, Angular 21 frontend, and Electron shell for Windows distribution.

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

### Full Electron Build
See `.github/workflows/build-windows.yml` — builds frontend, publishes backend self-contained, assembles Electron NSIS installer.

## Architecture

**Clean Architecture** with these .NET projects:

- **SchulBusserl** — ASP.NET Core host. `Startup.cs` configures DI, CORS (dev only), SPA serving, Serilog logging.
- **SchulBusserl.Api** — Controllers (inherit `ApiController` base), action filters (`LoggingActionFilter`, `ModelStateValidationActionFilter`), `ExceptionHandlerMiddleware` for centralized error handling mapping exceptions to `ErrorResult` with `ErrorCode` enums.
- **SchulBusserl.Application** — Business logic (handlers/services). Currently empty scaffold.
- **SchulBusserl.Application.Contract** — DTOs, commands, queries. Currently empty scaffold.
- **SchulBusserl.Application.Interfaces** — Abstraction interfaces. Currently empty scaffold.
- **SchulBusserl.Domain** — Domain entities. Currently empty scaffold.
- **SchulBusserl.Infrastructure** — Data access. Currently empty scaffold (no DB configured yet).
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

## Claude-Specific Rules

- When running `ng build` to verify compilation, always use `--output-path dist-claude` to avoid overwriting the user's `dist/` folder.

## Key Conventions

- Never use abbreviated or shortened variable/parameter names (e.g. `fb` instead of `formBuilder`). Always use full, descriptive names.
- Central package versioning via `Directory.Packages.props`
- .editorconfig: 4-space indents, CRLF line endings, 120 char line length
- Backend code style enforced in build; Release builds treat warnings as errors
- Frontend linting: ESLint with Angular-ESLint rules + Stylelint for SCSS

## Frontend Patterns

- **Dialog system**: `DialogBase` (abstract) handles MatDialog lifecycle. `FormDialogDirective` uses an abstract `createForm(formBuilder, initialValue)` method — the base constructor calls it to create the form and set up `canSubmit` as a signal via `toSignal`. Subclasses pass their form type as generic parameter `TForm` (position 4) to get typed `form.controls` in templates. Place type aliases for form types below the component class definition, not between imports.

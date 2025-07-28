# 📄 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.1.0-alpha] - 2025-07-14

### Added

- Reinitialized project using **Next.js 14** with `Pages Router` and **CSR-only** setup.
- Switched from `TailwindCSS` to `Less` for styling (basic config ready).
- Added `pnpm` support for dependency management.
- Configured `Prettier` and `ESLint` with custom rules (e.g., double quotes, a11y plugin).
- Created initial file structure and cleaned up App Router-related files.
- Introduced `decisions.md` for architectural and technical decision tracking.
- Established `.env.production`, `.env.development`, and `.env.example` environment strategy.

### Removed

- TailwindCSS and default styles from `create-next-app`.
- App Router and related boilerplate.

### Changed

- Updated `prettier` config to use double quotes (`singleQuote: false`).
- Switched default build setup from SSR to CSR for internal-only usage.

---

## [Unreleased]

- Initial layout (sidebar + top nav + main content).
- Auth UI (login, register, error states).
- Route guards and JWT-based session storage.
- Calendar & scheduling module placeholder.

---

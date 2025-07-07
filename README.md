# 🧠 Rehabilitacja Frontend (Next.js)

This is the frontend of the **Rehabilitacja Module** application — handling user authentication, session scheduling, and integration with the backend API.

---

## 📦 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- TypeScript
- TailwindCSS
- ESLint + Prettier
- React Hook Form + Zod
- Zustand (planned)
- JWT-based authentication (planned)

---

## 🚀 Local Development

1. **Clone the repository**

```bash
git clone https://github.com/Rafalk88/rehabilitacja-frontend.git
cd rehabilitacja-frontend
```

2. Install dependencies

```bash
git clone https://github.com/Rafalk88/rehabilitacja-frontend.git
 cd rehabilitacja-frontend
```

3. Run the development server

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

## 🧪 Linting & Formatting

Run ESLint:

```bash
npm run lint
```

## 🗂️ Project Structure (Alpha)

```php
rehabilitacja-frontend/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages and layout
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions (e.g., auth, API)
│   ├── styles/           # Global styles
│   └── ...
├── .eslintrc.json
├── .prettierrc
└── ...
```

## 🔐 Authentication (Planned)

Login and register UI
JWT auth with secure cookie or localStorage
Route protection (middleware / HOC)
Integration with backend

## 🔐 Authentication (Planned)

Login and register UI
JWT auth with secure cookie or localStorage
Route protection (middleware / HOC)
Integration with backend

## 🛣️ Roadmap (Alpha)

Initial project setup
ESLint + Prettier config
Auth UI (login/register)
JWT session support
Dashboard layout
Calendar placeholder
Backend integration

## 🧾 Versioning

We follow SemVer.
This is an early alpha, versions will be tagged as 0.x.x-alpha.

See CHANGELOG.md for details.

## 📄 License

This project is for educational purposes only.
MIT-style open development (non-commercial).

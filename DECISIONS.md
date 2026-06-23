### 📄 `decisions.md`

# 🧠 Architectural & Tech Decisions – Rehabilitacja Frontend

> A living document of key decisions taken during the evolution of this project.
> Meant to explain **why** things are the way they are – for ourselves and future contributors.

---

## 1. ✅ **Client-Side Rendering Only (CSR)**

**Why:**
The app will be used only internally, within a controlled environment. SSR is unnecessary and would introduce extra complexity (caching, deployment, hydration mismatches).

**Decision:**
Next.js is configured to run purely with CSR using the **Pages Router**.

---

## 2. 🧱 **Pages Router over App Router**

**Why:**
App Router introduces overhead (e.g. `use client` directives, layouts API, nested segments) which we don’t need at this stage. Pages Router offers a simpler and more predictable setup for CSR apps.

**Decision:**
Project bootstrapped with `create-next-app` with **App Router disabled**.

---

## 3. 🎨 **Less instead of TailwindCSS**

**Why:**
We prefer classic styling control via Less variables and custom structure. TailwindCSS was removed to simplify the stack and focus on clean component styling.

**Decision:**

- Tailwind removed
- Global styles written in `.less`
- Utility classes replaced with reusable CSS class patterns

---

## 4. 🔧 **ESLint + Prettier – Flat Config**

**Why:**
Consistency and code quality are essential. We're using ESLint with Flat Config and Prettier with the following preferences:

- Double quotes (`"`)
- No semi-colons
- `prettier/prettier` integration for consistent formatting warnings

**Decision:**
Configured in `eslint.config.mjs` with Prettier integrated.
Accessibility (`jsx-a11y`) plugin included.
Prettier uses:

```json
{
  "singleQuote": false,
  "semi": false
}
```

---

## 5. 📦 **Package Manager: pnpm**

**Why:**
Faster installs, disk efficiency, and better monorepo support. npm was dropped in favor of `pnpm`.

**Decision:**
Standard for all project scripts and dependencies.

---

## 6. ⚙️ **Husky Pre-commit Hooks**

**Why:**
Code quality and test coverage need to be enforced automatically before each commit.

**Decision:**
Husky added with pre-commit hook running `pnpm test`. Tests must pass before commit is allowed.

---

## 7. 🌿 **Semantic Commits**

**Why:**
Better changelog generation, clarity in commit history, and future automation (e.g., release tools).

**Decision:**
Conventional commit format (e.g. `chore: re-initialized with CSR and Less`)

---

## 8. 🧾 Environment Strategy

**Why:**
Separation of environments is essential, even for internal tools.

**Decision:**

- `.env.development` and `.env.production` added
- No hardcoded values in code
- Use `process.env` access only in safe areas

---

## 9. 🎨 Styling Ant Design Components with own-\* Classes

**Why:**
Ant Design generates deeply nested CSS classes (e.g., `.ant-select`, `.ant-select-selector`) and applies token-based or inline styles. Overriding these styles globally (`.ant-*`) leads to brittle and hard-to-maintain code, especially in a growing team environment.

To maintain encapsulation and traceability, we apply styles by adding our own scoped class names (e.g., `.own-select`) to the top-level component and nesting custom styles within .less files.

**Decision:**

- Every styled AntD component should receive a unique class like `.own-*`, e.g., `.own-select`, `.own-table`.
- Styles should be scoped via nesting inside the component’s .less file:

```less
/* UnitSelector.less */
.own-select {
  width: 140px;

  .ant-select-selector {
    border-radius: 0;
    padding-inline: 8px;
  }
}
```

- Never style AntD globally (e.g., .ant-select { ... }) — always scope.
- This improves specificity, avoids conflicts during upgrades, and makes it easier to track customized areas.

**Benefits:**

- Clean separation between custom and library styles
- Predictable override behavior
- Easier onboarding and documentation

🗂 If this approach grows in complexity, we’ll extract it into a separate styling.md.

## 10. 🗂️ **Zustand for Global State**

**Why:**
Organizational unit selection needs to be shared between `UnitSelector` (TopNav) and `Office` page. Context API would cause unnecessary rerenders — Zustand stores state outside React tree and only rerenders components that subscribe to changed values.

**Decision:**
`useUser` store in `src/store/useUser.ts` holds `organizationalUnit` (selected unit name). Components subscribe via selector pattern.

---

## 11. 🔄 **React Query for Server State**

**Why:**
All API data needs caching, deduplication, and automatic refetching. Managing this manually with `useEffect` and `useState` leads to boilerplate and race conditions.

**Decision:**
`@tanstack/react-query` used for all API calls. Each hook wraps `useQuery` or `useMutation`. Cache is invalidated after mutations via `queryClient.invalidateQueries`.

## Next Planned Decisions

- Folder structure (feature-based or domain-based)
- Authentication handling pattern
- Design system or shared UI patterns

## 12. 🧪 **Jest Module Mocking — Default Exports**

**Why:**
While testing `useVisits`, mocking `@/lib/api` (a module with `export default api`) produced inconsistent results between what `console.log` showed inside the test file and what the hook actually received at runtime. The mock structure `{ default: { get: jest.fn() } }` looked correct in test-file logs, but caused `TypeError: api.get is not a function` when the hook called `api.get(...)`.

**Decision:**

- When mocking a module with `export default`, the mock shape must match what the **consumer of the import** (the hook/component under test) actually sees — not what `console.log` shows inside the test file itself.
- `next/jest`'s Babel/SWC transform can produce different interop behavior depending on import context.
- Correct mock pattern for `import api from "@/lib/api"`:

```typescript
jest.mock("@/lib/api", () => ({
  get: jest.fn().mockResolvedValue({ data: { data: [] } }),
}));
```

(no nested `default` key, despite what `console.log` may suggest)

- **Diagnostic method**: trust the runtime error thrown by the code under test over assumptions from logging the mock in isolation.

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

## 6. ⚙️ **No Husky or Git Hooks (Yet)**

**Why:**
To keep the development setup lightweight and focused. Hooks and automation (like lint-staged or pre-commit checks) will be introduced later once core features are stable.

**Decision:**
Skip Husky for now. Manual linting/formatting enforced during review.

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

## Next Planned Decisions

- Zustand setup and structure
- Folder structure (feature-based or domain-based)
- Authentication handling pattern
- Design system or shared UI patterns

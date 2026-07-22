---
name: architecture-diagram
description: Verify and update the frontend architecture HTML documents and Mermaid diagrams when the user explicitly invokes $architecture-diagram or requests architecture-diagram validation or maintenance. Use after changes to routes, route guards, state stores, React Query, API configuration, or application layer boundaries.
---

# Architecture Diagram

Use this skill to keep the architecture guide accurate. Treat source code as the authority; do not infer undocumented policy.

## Required reading

Read `frontend/AGENTS.md` and the relevant files under `frontend/docs/architecture/` first. Then inspect only the source relevant to the request:

- Routes or access control: `src/routes/Router.tsx` and applicable files in `src/routes/custom-route/`.
- State or caching: `src/store/`, `src/lib/query-client.tsx`, and affected API modules in `src/service/api/`.
- HTTP or authentication: `src/service/config/`, `src/lib/axios-instance.ts`, and affected auth APIs.
- Layer ownership: `src/main.tsx`, `src/App.tsx`, and affected `pages`, `components`, `service`, `store`, `lib`, `types`, `utils`, `constant`, and `data` paths.
- Input and mutation handling: affected `service/schema/` files plus representative form and mutation call sites.
- Loading and errors: affected Suspense routes, error boundaries, and toast handlers.

## Workflow

1. Classify the request as layer ownership, navigation/access, data/state, or a combination.
2. Compare relevant code with the matching HTML document and Mermaid diagram, including actual component-to-service/store imports rather than assuming a strictly page-owned data layer.
3. Verify the complete feature path when applicable: form state and Zod schema, API module and generated model, mutation result, cache invalidation, navigation, toast, loading, and error boundary.
4. Verify route redirects, NotFound handling, and the role hierarchy used by access guards.
5. Update only statements, links, nodes, or edges disproven by the code. Preserve correct content. Label intended behavior or a known risk when an error path does not guarantee the documented outcome.
6. Decide whether the change belongs in `overview`, `navigation-and-access`, or `data-and-state`. Propose a domain document only when those common documents cannot clearly explain an independent route, API, state, and permission flow.
7. Open every changed HTML file in a browser. Confirm relative links resolve, Mermaid renders an SVG, and the browser console has no document or Mermaid errors.
8. Report changed files, verified-but-unchanged files, and any policy that needs human confirmation.

## Document boundaries

- Put directory responsibilities and dependency direction in `overview/index.html`.
- Put component dependency rules, global providers, and shared support directories in `overview/index.html`.
- Put routes, layouts, redirects, NotFound handling, role hierarchy, and role checks in `navigation-and-access/index.html`.
- Put API clients, generated contracts, Zod schemas, React Query keys and invalidation, Zustand persistence, token handling, forms, loading, errors, and mutation side effects in `data-and-state/index.html`.
- Keep the root index limited to navigation and maintenance rules.

## Validation rules

- Keep Mermaid on the pinned CDN version and initialize it with `securityLevel: 'strict'`.
- Verify Mermaid nodes and edges against code, not against an earlier diagram.
- Do not describe a cleanup or retry outcome as guaranteed when an awaited error path can fail before the cleanup runs.
- Do not modify generated files under `src/service/model/` or `src/lib/http-client.ts`.
- If browser validation cannot run, state why and identify the unverified files.

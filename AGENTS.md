# AGENTS.md

## Purpose
Guidelines for humans and coding agents maintaining this blog repository for GitHub Pages.

## Non-Negotiable Constraints
- Keep existing content folders as-is.
- Keep posts in `YYYY/MM/*.md` folders (example: `2008/08/merdeka.md`).
- Keep images in `img/`.
- Do not move posts into `_posts`, `content/`, or other new structures.
- Prefer the simplest implementation with minimum additional libraries.

## Repository Structure (Current + Required)
- `index.html` = entry point/homepage.
- `img/` = static images referenced by posts/pages.
- `2006/`, `2007/`, `2008/`, ... = year folders.
  - Each year folder contains month folders (`01`..`12`).
  - Each month folder contains Markdown post files (`*.md`).

Path convention:
- `/<year>/<month>/<slug>.md`
- `year` must be 4 digits, `month` must be 2 digits.
- `slug` should be lowercase kebab-case when creating new files.

## Content Editing Rules
- Preserve original writing style and tone unless explicitly asked to edit content.
- Keep filename and path stability whenever possible (avoid breaking links).
- Use relative paths for assets.
- If link/path changes are unavoidable, update all internal references.
- Every new post/content file must also be synced into `assets/js/posts.json` so it appears in homepage/archive/article navigation.
- Blog title and description must be maintained in `content/blog.md` (single source used by homepage and article page).

## GitHub Pages Delivery Strategy (Minimal)
Default approach: **static-only, no build pipeline**.

- Serve `index.html` directly via GitHub Pages.
- Use minimal vanilla HTML/CSS/JS only.
- Avoid framework/tooling unless explicitly needed.
- Avoid runtime server dependencies.

Allowed by default:
- Plain HTML/CSS
- Small vanilla JS helpers

Avoid by default:
- Heavy UI frameworks
- Complex bundlers/transpilers
- Large dependency trees

## Minimal UI Principles
- Keep UI simple and readable.
- Prioritize content and archive navigation.
- No unnecessary animations/components.
- Use system fonts and minimal styling.
- Ensure mobile-friendly layout with simple responsive CSS.

## Future Code Features (Keep Minimal First)
1. Archive listing on homepage (grouped by year/month).
2. Post page rendering from Markdown to HTML (pre-generated or lightweight client approach).
3. Basic previous/next navigation between posts.
4. Optional tag support only if metadata exists.
5. Basic link/image validation script (optional).

## Preferred Implementation Order
1. Keep current structure and make homepage list posts.
2. Add a simple post renderer strategy compatible with GitHub Pages.
3. Add lightweight navigation improvements.
4. Add optional automation only when it clearly reduces manual work.

## If Tooling Is Introduced Later
Only introduce tooling when necessary, and keep it small:
- Keep output as static files for GitHub Pages.
- Keep source structure backward-compatible with existing `YYYY/MM` content.
- Document commands in `README.md`.

## Agent Operating Rules
- Make focused, minimal changes.
- Do not reorganize historical content directories.
- Do not introduce new libraries without clear need.
- Keep commits/changes reversible and low-risk.
- Update this file when structural conventions change.

## Definition of Done (for site changes)
A change is done when:
- Site is deployable on GitHub Pages as static files.
- Existing post/image paths still work.
- New content follows `YYYY/MM/*.md` and `img/` rules.
- Navigation remains simple and functional.

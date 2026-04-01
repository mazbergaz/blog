# Blog

Static blog for GitHub Pages.

## Structure
- `index.html`: homepage
- `article.html`: article page
- `assets/`: CSS and client-side JS
- `content/`: blog content and blog metadata
- `scripts/`: helper scripts

Content layout:
- posts stay in `content/YYYY/MM/*.md`
- blog metadata lives in `content/blog.md`
- post index lives in `assets/js/posts.json`
- images are currently stored in `content/img/`

## Local Workflow
When adding a new post:
1. Create the file in `content/YYYY/MM/slug.md`
2. Add the path to `assets/js/posts.json`

Helper commands:
```bash
make sync-posts
make watch-posts
```

## Notes
- Keep the site static and minimal for GitHub Pages.
- Do not reorganize historical content folders.
- Prefer vanilla HTML, CSS, and JS.
- See [AGENTS.md](/Users/bergasbimobranarto/Documents/workspace/src/github.com/mazbergaz/blog/AGENTS.md) for repository rules.
- See [STYLEGUIDE.md](/Users/bergasbimobranarto/Documents/workspace/src/github.com/mazbergaz/blog/STYLEGUIDE.md) for writing guidance.
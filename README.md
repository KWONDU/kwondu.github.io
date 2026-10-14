# kwondu.github.io

Personal homepage. Static site built with [Astro](https://astro.build); everything is pre-rendered to `dist/`.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Editing content

Everything you edit lives in `content/`. `src/` is layout and styling only.

```
content/
├── profile.md            sidebar: name, title, affiliation, portrait, links, co-author homepages
├── sections/             one file per section, shown in filename order
│   ├── 01-about.md
│   ├── 02-publications.md
│   └── ...
├── publications/         one file per paper (frontmatter only)
├── showcase/             one file per project (description = markdown body)
└── images/               portrait, covers/, logos/
```

### Sections

Each file in `content/sections/` has a `title` and a `type`:

| type           | renders                                                     |
| -------------- | ----------------------------------------------------------- |
| `text`         | the markdown body; `**bold**` becomes a highlighter stroke  |
| `publications` | every file in `content/publications/`, grouped by year      |
| `timeline`     | `items` with `name`, `role`, `date`, `logo`, `url`          |
| `list`         | `items` with `name`, `date`, `url` (awards, news, ...)      |
| `showcase`     | every file in `content/showcase/`                           |

- Reorder: rename the number prefix. The anchor drops it (`03-education.md` → `#education`).
- Hide without deleting: add `hidden: true` (also works for publications and showcase).
- New section: add a file, e.g. `content/sections/07-news.md` with `type: list`.

### Publications

Copy an existing file in `content/publications/`. Put the cover in `content/images/covers/`.

- Author suffixes: `*` equal contribution, `#` (or `†`) corresponding author, shown as `†`. Your own name is bolded automatically.
- `links:` takes one line per button, e.g. `Paper: https://...` and `Code: https://...`.
- Order and year grouping come from the arXiv link (`arxiv.org/abs/2502.11735` → Feb 2025, then by ID).
  Papers without an arXiv link need `date: 2025-02-17` instead.

Images are referenced relative to the markdown file (`../images/...`).
A missing or misspelled field stops the build with the file and field name.

## Deploy

Pushing to `main` deploys through `.github/workflows/deploy.yml`
(repo Settings → Pages → Source: GitHub Actions).

# Matthias Wong academic website

This is a Hugo site managed with blogdown and deployed by Netlify. It uses a
pinned Osprey Delight Git submodule, with small site-level overrides for current
Hugo compatibility, accessibility, and academic presentation.

## First-time setup

Clone the repository and its theme:

```sh
git clone --recurse-submodules https://github.com/mattw025/mattw025.github.io.git
cd mattw025.github.io
```

Install:

- R and RStudio;
- the current CRAN release of `blogdown`;
- Go 1.26.3, as recorded in `.go-version`.

From R, install the tested Hugo release:

```r
install.packages("blogdown")
blogdown::install_hugo(version = "0.165.0", extended = TRUE)
```

Preview the site with:

```r
blogdown::serve_site()
```

The site's prose pages are ordinary Markdown files. They do not need to be
knitted before deployment. If an R Markdown page is added later, blogdown is
configured to produce portable Markdown rather than a parallel HTML source.

## Content structure

- `content/about.md`: biographical overview;
- `content/gallery/`: research areas shown as cards on the home page;
- `content/publications.md`: publications and conference papers;
- `content/projects.md`: projects and public engagement;
- `content/teaching.md`: teaching experience.

The home-page order and navigation labels are defined in `config.yaml`.

## Build and validation

Build the publication version locally:

```sh
hugo --gc --minify
python3 scripts/check_internal_links.py public --base-url https://mattwong.co.uk/
```

From R, the equivalent site build is:

```r
blogdown::build_site(build_rmd = "timestamp")
blogdown::check_site()
```

GitHub Actions performs a clean production build with the theme submodule and
checks internal links on every pull request and every push to `main`. Netlify
uses the same Hugo release and publishes `public/`. Generated `public/` and
`resources/` directories are intentionally ignored.

## Theme management

Osprey Delight is pinned at commit `824fbe9`, the tested head of upstream
[PR 64](https://github.com/kdevo/osprey-delight/pull/64). This commit is newer
than v5.0.8 and replaces Hugo APIs removed or deprecated in recent releases.
Move to a released descendant once upstream incorporates those fixes.

The theme is loaded through Hugo Modules, with the submodule used as a local
replacement. This retains the theme's compatible icon and image modules while
keeping the complete theme source pinned and inspectable.

The submodule itself is not modified. Site-specific changes are kept outside
it:

- `layouts/index.html` combines PR 64's current Hugo APIs with the corrected
  partial lookup from upstream PR 63;
- `layouts/partials/icon*.html` adapt the older icon module to Hugo 0.165;
- the remaining files under `layouts/` and `assets/js/` improve navigation,
  accessibility, research presentation, and standalone pages;
- `assets/sass/_custom.scss` contains the site's visual customisation.

Review these overrides whenever the theme or its Hugo modules are updated.

Test a theme update on a branch:

```sh
git -C themes/osprey-delight fetch --tags
git -C themes/osprey-delight checkout <new-version>
git add themes/osprey-delight
```

Then run the local build and link check, inspect the Netlify Deploy Preview,
and merge only after the generated site has been reviewed.

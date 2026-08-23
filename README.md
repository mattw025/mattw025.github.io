# Matthias Wong academic website

This is a Hugo site managed with blogdown and deployed by Netlify. The Osprey
Delight theme is pinned as a Git submodule so theme changes are explicit and
reviewable.

## First-time setup

Clone the repository with its theme:

```sh
git clone --recurse-submodules https://github.com/mattw025/mattw025.github.io.git
cd mattw025.github.io
```

Install:

- R and RStudio
- the current CRAN release of `blogdown`
- Go 1.26.3, required by the theme's Hugo modules

From R, install the tested Hugo version:

```r
install.packages("blogdown")
blogdown::install_hugo(version = "0.165.0", extended = TRUE)
```

Then preview the site with:

```r
blogdown::serve_site()
```

Use `blogdown::serve_site()` rather than calling `hugo server` directly so
changes to R Markdown files are rendered before Hugo rebuilds the site.

## Build and checks

Build the publication version from R:

```r
blogdown::build_site(build_rmd = "timestamp")
```

Run blogdown's project checks after changing configuration or dependencies:

```r
blogdown::check_site()
```

Netlify builds the committed source with Hugo 0.165.0 and publishes `public/`.
The generated `public/` and `resources/` directories are intentionally ignored.

The theme is loaded through Hugo Modules, with the Git submodule used as a
local replacement. This lets Hugo resolve the theme's compatible module
dependencies while keeping the complete theme source pinned and inspectable in
`themes/osprey-delight`. Two compatibility templates in `layouts/partials/`
adapt the theme's icon module to Hugo 0.165.0. The `layouts/index.html`
override combines PR 64's modern Hugo fixes with the corrected partial lookup
from upstream PR 63. Review these three overrides whenever the theme or icon
module is updated.

## Updating the theme

The site pins Osprey Delight commit `824fbe9`, the tested head of upstream
[PR 64](https://github.com/kdevo/osprey-delight/pull/64). It is newer than the
v5.0.8 release and fixes Hugo APIs removed or deprecated in recent versions.
Because the pull request is not yet released, keep the exact commit pinned.
Move to a released descendant once upstream incorporates these changes.

Test theme updates in a branch:

```sh
git -C themes/osprey-delight fetch --tags
git -C themes/osprey-delight checkout <new-version>
git add themes/osprey-delight
```

After an update, run `blogdown::check_site()`, rebuild locally, and inspect a
Netlify Deploy Preview before merging.

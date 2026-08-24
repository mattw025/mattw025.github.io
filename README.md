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

Hugo Modules also require Go to be visible to the RStudio process. On Windows,
install Go, close RStudio completely, reopen it, and confirm the installation:

```r
Sys.which("go")
system2("go", "version")
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
- `content/publications.md`: research publications, methods contributions and dissertation;
- `content/projects.md`: projects and public engagement;
- `content/teaching.md`: teaching experience.

The home-page order and navigation labels are defined in `config.yaml`.

Each research card takes its image, accent colour, alternative text, credit,
crop position, and order from the corresponding file in `content/gallery/`.
Images live in `assets/`, where Hugo can resize and optimise them.

To add or replace a project photograph or historical source image, upload the
new file to `assets/` and update the relevant card front matter:

```yaml
alt: "A concise description of the image"
image: example-project.jpg
imageCredit: "Image: collection or photographer, licence if applicable"
imageDecorative: false
imagePosition: "center 35%"
imageStyle: photo
```

Use a landscape image, ideally 1800 x 1200 pixels (3:2) and at least 1200 x 800
pixels. JPEG or WebP is best for photographs; PNG is suitable for graphics or
transparency. Keep the file below about 1 MB where practical, use a lowercase
hyphenated filename without spaces, and confirm that Matt has permission to use
it. `imagePosition` is optional: `center` is the default, while values such as
`center 35%` can keep the important part of the image in view when it is cropped.
`imageCredit` is also optional, but should be included when attribution is
required. For a meaningful image, keep `imageDecorative: false` and write useful
`alt` text; use `true` only when the image adds no information.

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

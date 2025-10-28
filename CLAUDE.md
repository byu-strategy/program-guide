# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Quarto book project that creates the Strategic Management Program Guide website for BYU's Marriott School of Business. The site provides comprehensive information for prospective and current students about the Strategy major, including curriculum, career tracks, placement data, and faculty information.

## Technology Stack

- **Quarto**: Static site generator for creating books and websites from markdown and computational documents
- **Format**: Quarto Markdown (.qmd files) combining markdown with embedded HTML/CSS/JavaScript
- **Output**: HTML website published to `/docs` directory (configured for GitHub Pages)

## Build and Development Commands

### Preview the site locally
```bash
quarto preview
```
This starts a local server with live reload. Changes to .qmd files will automatically refresh the browser.

### Render the entire book
```bash
quarto render
```
Builds the complete site and outputs to `/docs` directory. This is what gets deployed to production.

### Render a single chapter
```bash
quarto render 01-courses.qmd
```
Useful for quickly testing changes to a specific chapter without rebuilding the entire site.

## Project Structure

### Configuration
- `_quarto.yml`: Main configuration file defining book structure, chapters, HTML theme (cosmo), and output settings
- `_header.html`: Custom HTML injected into the header of every page
- `_footer.html`: Custom footer HTML for every page
- `styles.css`: Custom CSS for profile cards, pivot tables, course builders, and footer styling

### Content Files (Chapters)
Content is organized as numbered .qmd files that form the book chapters:

1. `index.qmd` - Program overview and introduction (what is strategy, applicant profile, curriculum overview)
2. `01-courses.qmd` - Course listings, prerequisites, and junior/senior year curriculum
3. `02-tracks.qmd` - Four career tracks: Management Consulting, Corporate Strategy, Product, Research
4. `03-career.qmd` - Career outcomes, placement data, salary information
5. `04-clubs.qmd` - Student organizations and extracurricular activities
6. `05-mentorship.qmd` - Mentorship program details
7. `06-faculty.qmd` - Faculty profiles and contact information
8. `07-apply.qmd` - Application process and requirements
9. `08-faq.qmd` - Frequently asked questions

### Static Resources
- `/images/` - All images, logos, screenshots, and graphics
- `/data/` - CSV files (e.g., `alum-first-job.csv` for placement data)
- `/docs/` - Generated HTML output (do not edit directly)

## Content Editing Guidelines

### Embedded HTML and JavaScript
Many .qmd files contain embedded HTML for interactive features:
- Lazy-loaded YouTube videos with click-to-play functionality
- Custom profile grids for faculty and student leaders
- Interactive pivot tables for data visualization
- Custom styling with inline `<style>` tags and class attributes

### Data Integration
- Placement data is stored in `/data/alum-first-job.csv`
- Data visualizations may reference these CSV files directly in the .qmd files

### Styling Patterns
Key CSS classes defined in `styles.css`:
- `.presidency-grid`, `.profile-card` - For faculty/student profile displays
- `.pvtTable`, `.pvtUi` - Pivot table customization
- `.builder-container`, `.course-block` - Course builder interface
- `.book-header-banner`, `.book-footer` - Header/footer styling

## Key Features and Patterns

### Video Embedding
The site uses a lazy-load pattern for YouTube videos to improve page load performance. Videos appear as thumbnail images with a play button overlay, loading the iframe only when clicked.

### Responsive Design
The site uses the Cosmo theme from Quarto with custom responsive CSS for mobile layouts (see media queries in `styles.css` for breakpoints at 768px).

### External Links
Configured to open in new windows via `link-external-newwindow: true` in `_quarto.yml`.

### Social Media Integration
Open Graph and Twitter Card metadata configured in `_quarto.yml` for social sharing.

## Common Tasks

### Adding a new chapter
1. Create new `.qmd` file with appropriate numbering (e.g., `09-newchapter.qmd`)
2. Add chapter reference to `chapters:` list in `_quarto.yml`
3. Include YAML frontmatter with `title:` and optionally `editor: visual`
4. Render to see changes

### Updating placement data
1. Edit `/data/alum-first-job.csv`
2. Ensure CSV format matches: `degree_type,grad_year_band,company.name`
3. Re-render the site to update visualizations

### Modifying site-wide styles
1. Edit `styles.css` for custom CSS
2. Edit `_quarto.yml` to change theme or global settings
3. Edit `_header.html` or `_footer.html` for HTML-level changes

### Adding images
1. Place images in `/images/` directory
2. Reference in .qmd files using relative paths: `images/filename.png`
3. Use Quarto image syntax with options: `![](images/file.png){fig-align="center" width="85%"}`

## Publishing

The site is built to the `/docs` directory, which is typically configured as the GitHub Pages source. After rendering, commit and push changes to deploy updates to the live site.

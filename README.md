# Personal Website

This is a Next.js website configured for GitHub Pages deployment.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment to GitHub Pages

### Manual Deployment

```bash
# Install gh-pages package if not already installed
npm install --save-dev gh-pages

# Build and export the site
npm run export

# Deploy to GitHub Pages
npm run deploy
```

### Automated Deployment

This repository is configured with GitHub Actions. Simply push to the main branch and your site will be automatically deployed to GitHub Pages.

## Configuration

- Edit the `CNAME` file if you're using a custom domain
- The site will be available at `https://yourusername.github.io/repository-name/`
- If you're using a custom domain, it will be available at your domain

## Notes

- The `.nojekyll` file is needed to prevent GitHub Pages from ignoring files that begin with an underscore
- The `out/` directory is where your static site is generated 
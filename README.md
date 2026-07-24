# Nadirs (Angular library)

Private internal Angular library, published as `@abdullah-nadim/nadirs` via GitHub Packages.

## Build

```
npm install
npm run build
```

Output goes to `dist/nadirs`.

## Publishing

Pushes to `main` build and publish automatically (see `.github/workflows/publish.yml`) using the built-in `GITHUB_TOKEN`.

Bump the `version` in `projects/nadirs/package.json` before merging a release-worthy change.

## Local publish

```
npm run build
cd dist/nadirs
npm publish --registry https://npm.pkg.github.com
```

Requires a PAT with `write:packages` configured for the `@abdullah-nadim` scope (see the consuming repo's `.npmrc` for the read-side setup).

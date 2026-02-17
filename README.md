# Ori Share Chat — Template

A [Remotion](https://www.remotion.dev/) template for generating animated chat conversation videos. Create stories of **Ori** (an AI agent) interacting with groups of friends inside a phone chat UI.

This repo ships with a single placeholder story and three composition variants. Use it as a starting point to build your own chat animation stories.

## Commands

**Install Dependencies**

```console
pnpm i
```

**Start Preview**

```console
pnpm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Music

Music files are not committed to git. To download them:

```console
pnpm run download-music
```

This requires Python's `gdown` package (`pip install gdown`).

Music is optional — all compositions render correctly without it. When MP3 files are present in `public/music/`, they are automatically included in renders.

## Docs

See `AGENTS.md` for full architecture documentation and a guide on creating new stories.

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

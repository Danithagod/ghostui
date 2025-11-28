# GhostUI — Spectral React Component Library 👻

GhostUI is a Halloween-themed, atmospheric React component library engineered to deliver highly animated, cinematic user experiences.

## 📦 Installation

```bash
npm install ghostui-react framer-motion clsx tailwind-merge
```

## 🔧 Configuration

### Tailwind CSS

Add the GhostUI preset to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    // ... your paths
    "./node_modules/ghostui-react/dist/**/*.{js,mjs}", // Or path to src in monorepo
  ],
  presets: [
    require('ghostui-react/tailwind-preset')
  ],
  // ...
}
```

## 🧩 Components

### Core Components

- **GooeyButton**: A button with liquid hover distortion effects.
- **MoonlightSwitch**: A toggle switch with moon phase animations.
- **CoffinCard**: A hexagonal card container with clip-path styling.
- **SpiritInput**: An input field with smoky underline animations.
- **BatDivider**: A divider with drifting bat animations.

## 🏗️ Development

This project is a monorepo using NPM workspaces.

- `packages/ghostui`: The core component library.
- `apps/haunted-ledger`: Vite + React example app.
- `apps/moonlight-blog`: Next.js example app.

### Commands

- `npm install`: Install dependencies.
- `npm run dev -w packages/ghostui`: Start library in watch mode.
- `npm run dev -w apps/haunted-ledger`: Start Haunted Ledger app.
- `npm run dev -w apps/moonlight-blog`: Start Moonlight Blog app.

## 👻 Team GhostUI

Built for the Kiroween hackathon.

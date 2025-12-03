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

GhostUI provides a collection of atmospheric, animated React components perfect for creating spooky, cinematic user experiences. Components include buttons, cards, inputs, loaders, modals, tooltips, cursor effects, page transitions, and more.

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

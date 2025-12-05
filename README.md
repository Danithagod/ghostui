<div align="center">

# 👻 GhostUI

### Spectral React Component Library

*Hauntingly beautiful, eerily smooth animations for your React applications*

[![NPM Version](https://img.shields.io/npm/v/ghostui-react?style=for-the-badge&logo=npm&logoColor=white&color=8b5cf6)](https://www.npmjs.com/package/ghostui-react)
[![NPM Downloads](https://img.shields.io/npm/dm/ghostui-react?style=for-the-badge&logo=npm&logoColor=white&color=7c3aed)](https://www.npmjs.com/package/ghostui-react)
[![License](https://img.shields.io/npm/l/ghostui-react?style=for-the-badge&color=6d28d9)](./LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

[📚 Documentation](https://ghostui-docs.vercel.app) • [🛍️ Live Demo](https://ghostui-demo.vercel.app) • [📦 NPM Package](https://www.npmjs.com/package/ghostui-react)

</div>

---

## ✨ What is GhostUI?

GhostUI is a **Halloween-themed React component library** that brings atmospheric, cinematic experiences to your web applications. Built with **Framer Motion** and **Tailwind CSS**, every component is crafted to deliver smooth animations, eerie effects, and a hauntingly delightful user experience.

Perfect for creating spooky landing pages, Halloween-themed apps, or adding a touch of supernatural flair to any project.

## 🎃 Key Features

<table>
<tr>
<td width="50%">

### 🌙 Atmospheric Components
30+ pre-built components with haunting animations and eerie effects

</td>
<td width="50%">

### ⚡ Performance First
Optimized animations using Framer Motion for buttery-smooth 60fps experiences

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Fully Customizable
Built on Tailwind CSS - easily theme and customize to match your brand

</td>
<td width="50%">

### ♿ Accessible by Default
WCAG compliant with proper ARIA labels, keyboard navigation, and screen reader support

</td>
</tr>
<tr>
<td width="50%">

### 📱 Responsive Design
Mobile-first approach ensures perfect rendering on all screen sizes

</td>
<td width="50%">

### 🔧 TypeScript Native
Full TypeScript support with comprehensive type definitions

</td>
</tr>
</table>

## 🚀 Quick Start

### Installation

```bash
npm install ghostui-react framer-motion clsx tailwind-merge
```

```bash
yarn add ghostui-react framer-motion clsx tailwind-merge
```

```bash
pnpm add ghostui-react framer-motion clsx tailwind-merge
```

### Setup Tailwind CSS

Add the GhostUI preset to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/ghostui-react/dist/**/*.{js,mjs}",
  ],
  presets: [
    require('ghostui-react/tailwind-preset')
  ],
}
```

### Basic Usage

```tsx
import { GooeyButton, GhostCursor, SpectralTabs } from 'ghostui-react';
import 'ghostui-react/styles.css';

function App() {
  return (
    <>
      <GhostCursor />
      <GooeyButton variant="primary">
        Click Me 👻
      </GooeyButton>
      <SpectralTabs
        tabs={[
          { id: 'tab1', label: 'Potions', content: <div>Potions content</div> },
          { id: 'tab2', label: 'Spells', content: <div>Spells content</div> },
        ]}
      />
    </>
  );
}
```

## 🧩 Component Showcase

<div align="center">

| Category | Components |
|----------|-----------|
| **🎯 Interactive** | `GooeyButton` • `MoonlightSwitch` • `SpectralTabs` |
| **📦 Layout** | `CoffinCard` • `GooeyCard` • `GooeyDrawer` • `GooeySidebar` |
| **📝 Forms** | `SpiritInput` • `WhisperBox` |
| **🎨 Visual Effects** | `GhostCursor` • `WispTrail` • `BloodSmear` • `ShadowCrawl` |
| **🌊 Animations** | `SpectralRiver` • `HauntedVignette` • `SpookyScrollbar` |
| **💬 Feedback** | `GhostToast` • `SpookyTooltip` • `GraveModal` |
| **⏳ Loading** | `SpookySkeleton` • `GooeyProgressBar` |
| **🎭 Utilities** | `ThemeProvider` • `BatIcon` |

</div>

### Component Highlights

```tsx
// Gooey animated button with hover effects
<GooeyButton variant="primary" size="lg">
  Summon Spirits
</GooeyButton>

// Atmospheric card with coffin shape
<CoffinCard title="Dark Ritual" intensity="high">
  Your haunting content here...
</CoffinCard>

// Custom ghost cursor that follows mouse
<GhostCursor />

// Animated progress bar with gooey effect
<GooeyProgressBar value={75} variant="success" />

// Toast notifications with spectral animations
<GhostToast message="Potion brewed successfully!" type="success" />
```

> 📖 **[View Full Component Documentation →](https://ghostui-docs.vercel.app)**

## 🎬 Live Examples

<table>
<tr>
<td width="50%" align="center">

### 📚 Documentation Site
**[ghostui-docs.vercel.app](https://ghostui-docs.vercel.app)**

Comprehensive component documentation with live examples, API references, and interactive playgrounds

</td>
<td width="50%" align="center">

### 🛍️ Potion Shop Demo
**[ghostui-demo.vercel.app](https://ghostui-demo.vercel.app)**

Full-featured e-commerce demo showcasing GhostUI components in a real-world application

</td>
</tr>
</table>

---

## 🏗️ Development

This is a monorepo managed with **NPM workspaces**.

### Project Structure

```
ghostui/
├── packages/
│   └── ghostui/          # Core component library
├── apps/
│   ├── demo/             # Potion shop demo (Next.js)
│   └── docs/             # Documentation site (Next.js)
```

### Development Commands

```bash
# Install all dependencies
npm install

# Start library in watch mode
npm run dev -w packages/ghostui

# Start demo app
npm run dev -w apps/demo

# Start docs site
npm run dev -w apps/docs

# Build everything
npm run build:all

# Run tests
npm run test -w packages/ghostui
```

## 🚀 Deployment & CI/CD

GhostUI uses **Vercel** for automatic deployments:

- ✅ **Automatic Production Deploys** - Every push to `main` goes live
- 🔍 **Preview Deployments** - Every PR gets a unique preview URL
- 📦 **Monorepo Support** - Seamless multi-app deployment from one repository

### Quick Deploy

```bash
# Build everything locally
npm run build:all

# Test production builds
npm run start --workspace=apps/demo
npm run start --workspace=apps/docs
```

📖 **Detailed Guides:**
- [Deployment Guide](./DEPLOYMENT.md)
- [Local Build Testing](./LOCAL_BUILD_TESTING.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

---

## 📦 Publishing to NPM

```bash
cd packages/ghostui

# Update version (patch/minor/major)
npm version patch

# Build and publish
npm run build
npm publish --access public
```

📖 **[Full Publishing Guide →](./NPM_PUBLISHING.md)**

---

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports and fixes
- ✨ New component ideas
- 📝 Documentation improvements
- 🎨 Design enhancements

Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🎃 Built With

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

<div align="center">

## 👻 Team GhostUI

*Built with 💜 for the Kiroween Hackathon*

**[⭐ Star us on GitHub](https://github.com/yourusername/ghostui)** • **[📦 Try on NPM](https://www.npmjs.com/package/ghostui-react)** • **[📚 Read the Docs](https://ghostui-docs.vercel.app)**

*May your components be spooky and your animations be smooth* 🎃

</div>

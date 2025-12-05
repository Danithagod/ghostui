#!/bin/bash
set -e

echo "Installing rollup binary..."
npm install @rollup/rollup-linux-x64-gnu --no-save

echo "Building ghostui-react package..."
cd packages/ghostui
npm run build
cd ../..

echo "Building docs app..."
cd apps/docs
npm run build
cd ../..

echo "Build complete!"

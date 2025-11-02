#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// If we're being called from opennextjs-cloudflare, skip the extra build
if (process.env.BUILDING_WORKER === 'true') {
  console.log('Building Next.js app...');
  execSync('next build', { stdio: 'inherit' });
  process.exit(0);
}

// Otherwise, do the full build
console.log('Building Next.js app...');
execSync('next build', { stdio: 'inherit' });

console.log('\nBuilding Cloudflare Worker...');
process.env.BUILDING_WORKER = 'true';
execSync('opennextjs-cloudflare build', { stdio: 'inherit' });

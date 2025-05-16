#!/usr/bin/env node
// scripts/oci-upload.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const mime = require('mime'); // you'll install this in CI

const bucket = process.env.OCI_BUCKET_NAME;
if (!bucket) {
  console.error('ERROR: OCI_BUCKET_NAME not set');
  process.exit(1);
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else {
      // Compute the object name relative to dist/, using forward slashes
      const rel = path.relative('dist', full).replace(/\\/g, '/');
      const type = mime.getType(full) || 'application/octet-stream';
      console.log(`Uploading ${rel} (Content-Type: ${type})`);
      execSync(
        [
          'oci os object put',
          `--bucket-name ${bucket}`,
          `--name ${rel}`,
          `--file ${full}`,
          `--content-type "${type}"`,
          '--overwrite'
        ].join(' '),
        { stdio: 'inherit' }
      );
    }
  }
}

walk('dist');

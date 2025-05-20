#!/usr/bin/env node
// scripts/oci-upload.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

const namespace = process.env.OCI_NAMESPACE;
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
          `--namespace ${namespace}`,
          `--bucket-name ${bucket}`,
          `--name ${rel}`,
          `--file ${full}`,
          `--content-type "${type}"`,
          '--disable-parallel-uploads',
        ].join(' '),
        { stdio: 'inherit' }
      );
    }
  }
}

walk('dist');

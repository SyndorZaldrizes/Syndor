#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const url = process.argv[2];
    if (!url) {
      console.error('Usage: node run-lighthouse-check.js <url>');
      process.exit(1);
    }

    const outputPath = path.resolve(process.cwd(), 'lighthouse.json');

    console.log(`Running Lighthouse against ${url} ...`);
    const cmd = `npx -y lighthouse "${url}" --quiet --chrome-flags="--no-sandbox --headless" --output json --output-path="${outputPath}"`;
    execSync(cmd, { stdio: 'inherit' });

    if (!fs.existsSync(outputPath)) {
      console.error('Lighthouse did not produce an output file.');
      process.exit(1);
    }

    const raw = fs.readFileSync(outputPath, 'utf8');
    const report = JSON.parse(raw);

    const categories = report.categories || {};
    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      'best-practices': Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100)
    };

    const thresholds = {
      performance: 60,
      accessibility: 85,
      'best-practices': 80,
      seo: 80
    };

    console.log('Lighthouse scores:', scores);
    console.log('Thresholds:', thresholds);

    const failures = [];
    for (const key of Object.keys(thresholds)) {
      if (scores[key] < thresholds[key]) {
        failures.push({ key, score: scores[key], threshold: thresholds[key] });
      }
    }

    if (failures.length) {
      console.error('Lighthouse thresholds not met:');
      failures.forEach((f) => {
        console.error(`  - ${f.key}: ${f.score} < ${f.threshold}`);
      });
      console.error(`Full report available at ${outputPath}`);
      process.exit(2);
    }

    console.log('All Lighthouse thresholds satisfied.');
    process.exit(0);
  } catch (err) {
    console.error('Error running Lighthouse check:', err);
    process.exit(1);
  }
}

run();

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Create screenshots directory if it doesn't exist
    const screenshotDir = path.join(__dirname, 'temporary screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    // Find next available screenshot number
    let counter = 1;
    let screenshotPath;
    while (true) {
      const baseName = label ? `screenshot-${counter}-${label}.png` : `screenshot-${counter}.png`;
      screenshotPath = path.join(screenshotDir, baseName);
      if (!fs.existsSync(screenshotPath)) {
        break;
      }
      counter++;
    }
    
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to: ${screenshotPath}`);
  } finally {
    await browser.close();
  }
}

takeScreenshot().catch(console.error);
